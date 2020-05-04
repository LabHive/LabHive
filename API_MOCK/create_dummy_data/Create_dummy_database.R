#' ---
#' title: "Create_Dummy_DB"
#' author: "Tobias Opialla"
#' date: "4/9/2020"
#' output: html_document
#' abstract: "I want to create a dummy database, so we have something to test with. 
#' I also want to use our list of diagnostic labs, perhaps we can use this to put on the map already. 
#' Please remember to authenticate yourself to the dev-server (currently line 402)"
#' ---
#' 
## ----setup, include=FALSE-------------------------------------------------------------------------
knitr::opts_chunk$set(echo = TRUE)
library(tidyverse)
library(openxlsx)
library(httr)
#library(googlesheets4)
library(jsonlite)

#' 
## ----load base data-------------------------------------------------------------------------------
# zipcodes_de=read.csv("./zipcodes.de.csv",fileEncoding = "UTF-8",stringsAsFactors = F,
#                      colClasses = c("zipcode"="character"))

adresses=read.delim("real_adresses.tsv",stringsAsFactors = F)
randomnames=read.csv("./Randomnames.csv",stringsAsFactors = F)

#' 
## ----load our own diagnostic center list----------------------------------------------------------
#df_diagnosticlabs=read_sheet('https://docs.google.com/spreadsheets/d/1aDqqyxmHNIbDx1kRzlFZNR9EtlkY0e3D4L7dgq6AyZM/edit#gid=0',trim_ws = T)
#write.csv(df_diagnosticlabs,"diagnosticlabs.csv",row.names = F) #issue with file encoding can currently only be solved this way

df_diagnosticlabs=read.csv("diagnosticlabs.csv",stringsAsFactors = F,fileEncoding = "utf-8")
df_diagnosticlabs=df_diagnosticlabs %>% filter(!is.na(Kategorie))

df_diagnosticlabs$street=
  gsub("(.*),.*","\\1",df_diagnosticlabs$Adresse)

df_diagnosticlabs$zipcode=
  gsub(".*[[:punct:][:space:]](\\d{5}) .*","\\1",df_diagnosticlabs$Adresse)

df_diagnosticlabs$city=
  gsub(".*[[:punct:][:space:]]\\d{5} (.*)","\\1",df_diagnosticlabs$Adresse)


#' 
#' 
## ----generate random stuff------------------------------------------------------------------------

#set.seed(42) #these results are already in the database

sampleone=function(x,size=1){
  sample(x=x,size = size,replace = T)
}
# randstreet=function(length=1){
#   paste(paste0(sample(zipcodes_de$place,size=length),"er"),
#                  sample(c("Straße","Weg", "Allee", "Steig"),size=length,replace = T),
#                  sample(1:400,size=length,replace = T))
# }

randforschungsgruppe=function(length=1){
  paste(
    sample(c("Die besten","Die tollsten","Die cleversten", "die lustigsten"),
           size=length, replace=T),
    sample(c("Wissenschafft","Diagnostik","Datenanalyse"),
           size=length,replace=T),
    sample(c("Schaffenden","Durchführenden","Veranstaltenden"),
           size=length,replace=T),
    sample(c("der Welt","überhaupt","hier"),
           size=length,replace=T)
  )
}

randpwd=function(length=1){
  stringi::stri_rand_strings(n=length,length = sample(8:14,size = length,replace = T),
                             pattern = "[0-9A-Za-z\\(\\)\\&\\%\\$\\#\\^_\\'\\[:;,\\.\\]\\{\\}/*+@\\-]")
}

randphone=function(length=1){
  paste0(rep("0",length=length),
         paste0(sampleone(2:9),
                paste0(sample(0:9,
                              size = sampleone(5:10),replace = T),
                       collapse = "")))
}

randorganization=function(cities){
  paste(sample(c("Labor","Versorgunszentrum","Krankenhaus","Universität"),
               size=length(cities),replace = T),
        cities)
}

qualification=c("jobTraining",
                "mtla",
                "bta_cta",
                "bachelor",
                "master",
                "doctorate",
                "postdoc",
                "groupLeader")

skills=c("bsl1","bsl2","bsl3","bsl4",
         "qpcr","rnaExperience_isolation",
         "sample_processing","elisa",
         "primerProduction","dataAnalysis")

equipment=c("calibratedPipetteSet",
            "rtThermocycler",
            "qpcrThermocycler",
            "primerProduction",
            "reverseTransKit",
            "pcrMasterMix",
            "rnaExtractionDevice",
            "rnaExtractionKit")

advice=c("virology",
         "rnaExperience_isolation",
         "qPCR",
         "elisa",
         "protocolProduction")

rand_equipmentdescription=function(length=1){
  paste(
    "ich habe ein tolles gerät: ein/e",
    sample(c("qpcr-Maschine","Ostereierbemalmaschine","supergenaue Pipette"),
           size = length,replace = T),
    "in",  
    sample(c("rot.","blau.","superschön.","grün.","bunt.","klein.","Glitzeroptik."),
           size = length,replace = T)
  )
  
}

rand_advicedescription=function(length=1){
  r=paste(
    "Ich",
    sample(c("weiß alles über","berate gerne zu","hab ein bisschen Ahnung von"),
           size = length,replace = T),
    sample(c("allem.","den meisten Sachen.","vielen Dingen.","großen Herausforderungen."),
           size = length,replace = T)
  )
  if(grepl(r,"über vielen Dingen")){
    r=gsub("vielen Dingen","viele Dinge",r)
  }
  return(r)
}

teststring="TD"


#' 
#' 
#' # Framework for variable
## ----write dfs------------------------------------------------------------------------------------
for(csheetname in getSheetNames("./fields2fill.xlsx")){
  df_structure=read.xlsx('./fields2fill.xlsx',sheet = csheetname) %>% 
    filter(currently_active) %>% 
    mutate(field_group_name=paste(group_name,
                                  field_name,
                                  sep = "_"),
           allowed_values=ifelse(is.na(allowed_values),
                                 "FALSE",allowed_values)
    )
  current_role=df_structure$field_name[df_structure$class=="role"]
  
  df_structure=df_structure[df_structure$class!="role",]
  
  
  #for testing only!
  generateMissing = TRUE
  if(generateMissing){
    df_structure$required=TRUE
  }
  
  #set length of dfs needed
  if(grepl("volunteer",csheetname,ignore.case = T)){
    lengthdf=50 # n entries to be generated
  }else if(grepl("diagnostic",csheetname,ignore.case = T)){
    lengthdf=nrow(df_diagnosticlabs)
  }else{
    lengthdf=50
  }
  
  
  
  
  
  df=df_structure$field_group_name %>% purrr::map_dfc(setNames, 
                                                      object = list(logical(lengthdf)))
  
  adressI=sample(1:nrow(adresses),size = lengthdf,replace = T)
  namesI=sample(1:nrow(randomnames),size = lengthdf,replace = T)
  
  for(i in 1:nrow(df_structure)){
    #print(i)
    #print(df_structure$field_name[i])
    if(df_structure$allowed_values[i]=="TRUE"){
      df[i]=TRUE
    }
    else if(df_structure$class[i]=="boolean"){
      df[i]=sample(c(TRUE,FALSE),size = lengthdf,replace = T)
      
    }else if(df_structure$field_name[i]=="city"){
      df[i]=adresses$ort[adressI]
    }else if(df_structure$field_name[i]=="zipcode"){
      df[i]=as.character(adresses$plz[adressI])
    }else if(df_structure$field_name[i]=="street"){
      df[i]=adresses$strasse[adressI]#randstreet(length = lengthdf)
      
    }else if(df_structure$field_name[i]=="phone"){
      df[i]=randphone(length = lengthdf)
      
    }else if(df_structure$field_name[i]=="salutation"){
      df[i]=randomnames$Anrede[namesI]
      removeindex=sample(1:lengthdf,size=round(lengthdf/5,digits = 0),replace = FALSE)
      #20percent of values of non mandatory fields go away
      df[removeindex,i]=""
      
    }else if(df_structure$field_name[i]=="firstname"){
      df[i]=paste(randomnames$Vorname[namesI],teststring)
    }else if(df_structure$field_name[i]=="lastname"){
      df[i]=paste(sample(randomnames$Nachname,size = lengthdf,replace = T),teststring)
    }else if(df_structure$field_name[i]=="password"){
      df[i]="supersecretpw"# randomnames$Vorname[namesI] #so we know the passwords of our users
    }else if(df_structure$field_name[i]=="description"){
      df[i]=randforschungsgruppe(length = lengthdf)
    }else if(df_structure$field_name[i]=="equipmentDescription"){
      df[i]=rand_equipmentdescription(length = lengthdf)
    }else if(df_structure$field_name[i]=="adviceDescription"){
      df[i]=rand_advicedescription(length = lengthdf)
      
    }else if(df_structure$field_name[i]=="advice"){
      for(j in 1:lengthdf){
        df[j,i][[1]]=list(sample(advice,replace = F,size = sampleone(1:length(advice))))
      }      
    }else if(df_structure$field_name[i]=="equipment"){
      for(j in 1:lengthdf){
        df[j,i][[1]]=list(sample(equipment,replace = F,size = sampleone(1:length(equipment))))
      }
    }else if(df_structure$field_name[i]=="volunteerSkills"){
      for(j in 1:lengthdf){
        df[j,i][[1]]=list(sample(skills,replace = F,size = sampleone(1:length(skills))))
      }      
    }else if(df_structure$field_name[i]=="skills"){
      for(j in 1:lengthdf){
        df[j,i][[1]]=list(sample(skills,replace = F,size = sampleone(1:length(skills))))
      }
    }else if(df_structure$field_name[i]=="qualifications"){
      for(j in 1:lengthdf){
        df[j,i][[1]]=list(sample(qualification,replace = F,size = sampleone(1:length(qualification))))
      }
    }
    
  }
  
  
  df$contact_email=paste0(df$contact_firstname,
                          sampleone(c(".","-","_")),
                          df$contact_lastname,
                          "@provider.xyz") %>% 
    gsub(teststring,"",.) %>% 
    tolower() %>% 
    gsub("ä","ae",.) %>% 
    gsub("ö","oe",.) %>% 
    gsub("ü","ue",.) %>% 
    gsub("ß","ss",.) %>% 
    gsub("[[:space:]]+","",.)
  if(grepl("diagnostic",csheetname,ignore.case = T)){
    df[grep("organization",names(df))] = df_diagnosticlabs$Institut
    df[grep("website",names(df))] = df_diagnosticlabs$Link
    df[grep("city",names(df))] = df_diagnosticlabs$city
    df[grep("zipcode",names(df))] = df_diagnosticlabs$zipcode
    df[grep("street",names(df))] = df_diagnosticlabs$street
    
  }else{
    df[grep("organization",names(df))] = 
      randorganization(cities = df[,grep("city",names(df)),drop=T])
    
    df[grep("website",names(df))] = 
      paste0(sample(c("http://","https://","http://www.","https://www."),
                    size=nrow(df),replace = T),
             df[,grep("organization",names(df)),drop=T] %>% 
               tolower() %>% 
               gsub("ä","ae",.) %>% 
               gsub("ö","oe",.) %>% 
               gsub("ü","ue",.) %>% 
               gsub("ß","ss",.) %>% 
               gsub("[[:punct:][:space:]]+","-",.),
             ".de")
  }
  
  
  
  #make holes for non-required fields
  
  for(i in 1:nrow(df_structure)){
    if(df_structure$class[i]=="character"&(!df_structure$required[i])){
      removeindex=sample(1:lengthdf,size=round(lengthdf/5,digits = 0),
                         replace = FALSE)
      #20percent of non mandatory field values are removed
      df[removeindex,i]=""
    }
  }
  
  # #write out data/assign
   assign(paste0("df_",csheetname),df)
  # saveRDS(df,paste0("dummydata_",csheetname,".rds"))
  # df2=df
  # df2[sapply(df2, is.list)] <- lapply(df2[sapply(df2, is.list)],paste)
  # 
  # write_delim(df2,paste0("dummydata_",csheetname,".tsv"),delim = "\t")
}


#' 
## ----create jsons and post to server ---------------------------------------------------------------------------------
for(csheetname in getSheetNames("./fields2fill.xlsx")){
  print(csheetname)
  #csheetname="Registration_volunteer"
  #csheetname="Registration_DiagnosticLab"
  #csheetname="Registration_ResearchLab"
  df_structure=read.xlsx('./fields2fill.xlsx',sheet = csheetname) %>% 
    filter(currently_active) %>% 
    mutate(field_group_name=paste(group_name,
                                  field_name,
                                  sep = "_"),
           allowed_values=ifelse(is.na(allowed_values),
                                 "FALSE",allowed_values)
    )
  current_role=df_structure$field_name[df_structure$class=="role"]
  
  df_structure=df_structure[df_structure$class!="role",]
  
  if(csheetname=="Registration_volunteer"){
    df=df_Registration_volunteer
  }else if(csheetname=="Registration_DiagnosticLab"){
    df=df_Registration_DiagnosticLab
  }else if(csheetname=="Registration_ResearchLab"){
    df=df_Registration_ResearchLab
  }
  
  names(df)=gsub("^NA_","",names(df))
  
  for(i in 1:nrow(df)){ 
    l=list()
    
    for(cgroup in unique(df_structure$group_name)){
      if(is.na(cgroup)){
        for(cfield in unique(df_structure$field_name[is.na(df_structure$group_name)]))
          if(df_structure$unbox[df_structure$field_name==cfield]){
            l[cfield]=unbox(df[[cfield]][i])
          }else{
            l[cfield]=df[[cfield]][i]
          }
      }else{
        for(cfield in unique(df_structure$field_name[df_structure$group_name==cgroup&
                                                     (!is.na(df_structure$group_name))])){
          l[[cgroup]][cfield]=list(cfield)
          if(df_structure$unbox[df_structure$group_name==cgroup&
                                (!is.na(df_structure$group_name))&
                                df_structure$field_name==cfield]){
            l[[cgroup]][cfield]=unbox(df[i,names(df)==paste(cgroup,cfield,sep = "_"),drop=T])
          }else{
            l[[cgroup]][cfield]=df[i,names(df)==paste(cgroup,cfield,sep = "_"),drop=T]
          }
        }
      }
    }
    
    l$address$city=unbox(l$address$city)
    l$address$zipcode=unbox(l$address$zipcode)
    l$contact$email=unbox(l$contact$email)
    l$contact$phone=unbox(l$contact$phone)
    l$contact$firstname=unbox(l$contact$firstname)
    l$contact$lastname=unbox(l$contact$lastname)
    l$availability=unbox(l$availability)
    l$password=unbox(l$password)
    l$description=unbox(l$description)
    l$organization=unbox(l$organization)
    l$website=unbox(l$website)
    l$consent$publicSearch=unbox(l$consent$publicSearch)
    l$consent$mailUpdates=unbox(l$consent$mailUpdates)
    
    if(csheetname=="Registration_volunteer"){
      l$availability=unbox(l$availability)
    }
    
    if(csheetname=="Registration_DiagnosticLab"){
      l$address$street=unbox(l$address$street)
      l$offers$adviceDescription=unbox(l$offers$adviceDescription)
      l$offers$equipmentDescription=unbox(l$offers$equipmentDescription)
      l$lookingFor$adviceDescription=unbox(l$lookingFor$adviceDescription)
      l$lookingFor$equipmentDescription=unbox(l$lookingFor$equipmentDescription)
    }
    
    if(csheetname=="Registration_ResearchLab"){
      l$address$street=unbox(l$address$street)
      l$offers$adviceDescription=unbox(l$offers$adviceDescription)
      l$offers$equipmentDescription=unbox(l$offers$equipmentDescription)
    }
    
    ###Put password in here###
   x=POST(url=current_role,authenticate(user = "whoarewe?",password = "whoarewe?!"),
         body = toJSON(l,auto_unbox = F),encode = "raw",content_type_json())
   print(x$status_code)
    
    if(generateMissing){
      missingstring="withmissingvalues"
    }else{
      missingstring="nomissingvalues"
    }
    
    #write txt output for checking
    # cat(toJSON(l,auto_unbox = F),"\n",
    #     file = paste0(csheetname,"_jsons_",missingstring,".txt"),
    #     append = T)
  }
}
