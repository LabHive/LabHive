
import express from 'express'

export function language(req: express.Request, res: express.Response) {
    let accept_language = req.headers['accept-language']
    if (accept_language) {
        let raw_languages = accept_language.split(',')
        let languages = []
        for (let i of raw_languages) {
            // i is of format en-US;q=0.7
            let parts = i.split(';')
            let lang = {
                language: parts[0],
                priority: 1
            }
            if (parts.length > 1) {
                let prio = parts[1].replace('q=', '')
                try {
                    let prio_n = parseFloat(prio)
                    lang.priority = prio_n
                } catch { }
            }
            languages.push(lang)
        }

        let selected_lang = { language: 'en', priority: 1 }
        if (languages.length > 0) {
            selected_lang = languages[0]
            languages.splice(0, 1)
        }

        for (let lang of languages) {
            if (selected_lang.priority < lang.priority) {
                selected_lang = lang
            }
        }

        let selected_lang_id = selected_lang.language
        if (selected_lang_id.indexOf('de') > -1) {
            selected_lang_id = 'de'
        } else {
            selected_lang_id = 'en'
        }

        return res.send({
            success: true,
            language: selected_lang_id
        })
    }

    return res.send({
        success: true,
        language: 'en'
    })
}