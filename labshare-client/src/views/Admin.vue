<i18n>
{
  "en": {
    "title": "User Management"
  },
  "de": {
    "title": "Nutzer Management"
  }
}
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div style="margin-top: 40px">
      <b-table
        v-show="totalResults > 0"
        ref="table"
        :fields="fields"
        :items="items"
        :current-page="currentPage"
        hover
        stacked="md"
        per-page="20"
        @row-selected="onRowSelected"
        selectable
        select-mode="single"
        :tbody-tr-class="trclass"
      >

        <template v-slot:cell(Actions)="data">
          <b-row>
              <b-col cols="auto" v-if="!data.item.verified.manually">
                <b-button variant="success" @click="activate(data)" size="sm">Verify</b-button>
              </b-col>
              <b-col cols="auto" v-if="!data.item.disabled">
                <b-button variant="danger" @click="disable(data)" size="sm">Disable</b-button>
              </b-col>
              <b-col cols="auto" v-if="data.item.disabled">
                <b-button variant="warning" @click="enable(data)" size="sm">Enable</b-button>
              </b-col>
          </b-row>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-row>
              <b-col cols="auto" v-if="!row.item.verified.mail">
                <b-button variant="success" @click="resendMail(row)" size="sm">Resend activation mail</b-button>
              </b-col>
              <b-col cols="auto">
                <a :href="'mailto:' + row.item.contact.email"><b-button variant="primary" size="sm">Send Mail to user</b-button></a>
              </b-col>
              <b-col cols="auto" v-if="!row.item.verified.mail && $user.role === 'superAdmin'">
                <b-button variant="danger" @click="deleteUser(row)" size="sm">Delete User</b-button>
              </b-col>
            </b-row>
            <b-container fluid style="margin-top: 30px">
              <pre>{{row.item.json}}</pre>
            </b-container>
          </b-card>
        </template>
      </b-table>

      <h3 v-if="totalResults == 0">{{ $t("noResults") }}</h3>
    </div>

    <b-pagination
      v-if="totalResults > 20"
      v-model="currentPage"
      :total-rows="totalResults"
      :per-page="20"
      aria-controls="table"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentPage: 1,
      totalResults: 0,
      selectedRows: [],
      error: "",
    };
  },
  computed: {
    fields() {
      return [
        {
          key: "role",
          label: "Role"
        },
        {
          key: "name",
          label: "Name"
        },
        {
          key: "contact.email",
          label: "Mail"
        },
        {
          key: "website",
          label: "Website"
        },
        {
          key: "organization",
          label: "Organization"
        },
        {
          key: "Actions",
          label: "Actions"
        },
      ];
    }
  },
  methods: {
    onRowSelected(items) {
      this.selectedRows.map(item => {
        item._showDetails = false;
      });

      this.selectedRows = items;
      this.selectedRows.map(item => {
        item._showDetails = true;
      });
    },
    refreshTable() {
      this.error = ""
      this.$refs.table.refresh();
    },
    getSearchResults(page) {
      return new Promise((res, rej) => {
        this.$http.get("admin/users", {params: {page: page}}).then(
          success => {
            res(success.body);
          },
          error => {
            rej(error);
            console.log(error);
          }
        );
      });
    },
    trclass(item) {
      if (item.disabled) {
        return 'userDisabled'
      }

      return ""
    },
    items(ctx) {
      let page = ctx.currentPage;
      return this.getSearchResults(page)
        .then(body => {
          this.totalResults = body.totalResults;
          let b = body._embedded;

          return b.map(item => {
            item._showDetails = false;

            item.name = `${item.contact.firstname} ${item.contact.lastname}`
            item.json = JSON.stringify(item, null, 4)
            item.role = item.__t
            if (!item.verified.manually) {
                item._rowVariant = "danger"


                let hostnameMail = item.contact.email.split('@')[1]
                let hostnameMailRegexp = new RegExp(hostnameMail + "$")

                let website = document.createElement('a')
                website.href = item.website

                if (hostnameMailRegexp.test(website.hostname)) {
                    item._rowVariant = "warning"
                }
            }
            return item;
          });
        })
        .catch(() => {
          return [];
        });
    },

    activate(data) {
      let id = data.item._id
      this.$http.post("admin/user/activate/" + id).then(() => {
        this.refreshTable()
      }).catch((response) => {
        this.error = response.body.errorDescription
      })
    },

    disable(data) {
      let id = data.item._id
      this.$http.post("admin/user/disable/" + id).then(() => {
        this.refreshTable()
      }).catch((response) => {
        this.error = response.body.errorDescription
      })
    },

    enable(data) {
      let id = data.item._id
      this.$http.post("admin/user/enable/" + id).then(() => {
        this.refreshTable()
      }).catch((response) => {
        this.error = response.body.errorDescription
      })
    },

    deleteUser(data) {
      let id = data.item._id
      this.$http.post("admin/user/delete/" + id).then(() => {
        this.refreshTable()
      }).catch((response) => {
        this.error = response.body.errorDescription
      })
    },

    resendMail(data) {
      let id = data.item._id

      this.$http.post("admin/user/resendActivationMail/" + id).then(() => {
        this.refreshTable()
      }).catch((response) => {
        this.error = response.body.errorDescription
      })
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.userDisabled {
  color: rgba(0, 0, 0, 0.3)
}
</style>
