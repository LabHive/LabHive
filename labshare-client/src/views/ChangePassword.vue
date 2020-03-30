<i18n>
{
	"en": {},
	"de": {
		"title": "Change password",
		"successMessage": "Password updated",
		"loadingMessage": "Please wait",
		"pleaseEnterYourPasswordMessage": "Please enter your current password",
		"passwordTooShortMessage": "The password minimum length is 6 characters",
		"passwordsDoesNotMatchMessage": "The passwords doesn't match"
	}
}
</i18n>

<template>
	<div class="profile">
		<h1>{{ $t("title") }}</h1>

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
					<b-form-group id="password" :label="$t('password')">
						<b-form-input type="password" v-model="formData.oldPassword"></b-form-input>
					</b-form-group>

					<b-form-group id="password" :label="$t('repeatPassword')">
						<b-form-input type="password" v-model="formData.newPassword"></b-form-input>
					</b-form-group>

					<b-form-group id="password" :label="$t('repeatPassword')">
						<b-form-input type="password" v-model="formData.confirmNewPassword"></b-form-input>
					</b-form-group>

					<b-button variant="primary" type="submit">{{ $t("save") }}</b-button>
				</b-form>
			</div>
		</template>
	</div>
</template>

<script>
import Vue from 'vue'

export default {
	name: 'ChangePassword',
	data: function() {
		return {
			updated: false,
			loading: false,
			error: null,
			formData: {
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			},
		};
	},
	
	methods: {
		submit: function() {
			this.error = null;

			if (this.formData.oldPassword === '') {
				this.error = this.$t('pleaseEnterYourPasswordMessage');
			} else if (this.formData.newPassword.length < 6) {
				this.error = this.$t('passwordTooShortMessage');
			} else if (this.formData.newPassword !== this.formData.confirmNewPassword) {
				this.error = this.$t('passwordsDoesNotMatchMessage');
			} else {
				this.loading = true;
				
				Vue.http.post('change-password', { 
					newPassword: this.formData.newPassword, 
					oldPassword: this.formData.oldPassword 
				}).then(() => {
					this.updated = true;
					this.loading = false;
					setTimeout(() => this.updated = false, 3000);
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
