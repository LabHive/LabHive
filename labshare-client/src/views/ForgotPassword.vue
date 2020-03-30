<i18n>
{
	"en": {},
	"de": {
		"title": "Passwort vergessen",
		"successMessage": "Please check your email inbox",
		"loadingMessage": "Please wait",
		"pleaseEnterYourEmailMessage": "Please enter your email address",
		"submit": "Einreichen",
		"back": "Back to login"
	}
}
</i18n>

<template>
	<div class="profile">
		<h1>{{ $t("title") }}</h1>

		<p class="my-4">{{ $t('pleaseEnterYourEmailMessage') }}.</p>

		<template v-if="updated">
			<div class="alert alert-success">
				{{ $t("successMessage") }}
			</div>
		</template>

		<template v-if="loading">
			<div class="alert alert-warning">
				{{ $t("loadingMessage") }}
			</div>
		</template>
    
		<template v-if="!updated && !loading">
			<div v-if="error" class="alert alert-danger">
				{{ error }}
			</div>

			<div class="row">
				<b-form @submit="submit" class="col-md-6">
					<b-form-group id="email" :label="$t('email')">
						<b-form-input type="email" v-model="formData.email" trim></b-form-input>
					</b-form-group>

					<div class="my-3">
						<router-link to="/login">{{ $t('back') }}</router-link>
					</div>

					<b-button variant="primary" type="submit">{{ $t("submit") }}</b-button>
				</b-form>
			</div>
		</template>
	</div>
</template>

<script>
import Vue from 'vue'

export default {
	name: 'ForgotPassword',
	data: function() {
		return {
			updated: false,
			loading: false,
			error: null,
			formData: {
				email: ''
			},
		};
	},
	
	methods: {
		submit: function() {
			this.error = null;

			if (this.formData.email === '') {
				this.error = this.$t('pleaseEnterYourEmailMessage');
			} else {
				this.loading = true;
				
				Vue.http.post('forgot-password', { 
					email: this.formData.email
				}).then(() => {
					this.updated = true;
					this.loading = false;
				}, error => {
					this.error = error.body.errorDescription;
					this.loading = false;
				});
			}
		}
	},
	components: {}
};
</script>
