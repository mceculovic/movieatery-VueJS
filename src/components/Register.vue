<template>
    <div>
        <b-container>
             <b-form >
    <b-form-group
        label="First name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="user.firstName"
          type="text"
          placeholder="Enter first name"
          v-validate="{ required: true, min: 3, max: 30}"
          aria-describedby="firstName"
          :state="validateState('firstName')"
          data-vv-as="first name"
          data-vv-name="firstName"
        ></b-form-input>
    <b-form-invalid-feedback id="firstName">{{ veeErrors.first('firstName') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Last name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="user.lastName"
          type="text"
          placeholder="Enter last name"
          v-validate="{ required: true, min: 3, max: 30}"
          aria-describedby="lastName"
          :state="validateState('lastName')"
          data-vv-as="last name"
          data-vv-name="lastName"
        ></b-form-input>
    <b-form-invalid-feedback id="lastName">{{ veeErrors.first('lastName') }}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Email:"
        label-for="remail"
      >
        <b-form-input
          id="remail"
          v-model="user.email"
          type="email"
          placeholder="Enter email"
          v-validate="{ required: true, min: 5, max: 50, email: 'email'}"
          aria-describedby="remail"
          :state="validateState('remail')"
          data-vv-as="email"
          data-vv-name="remail"
        ></b-form-input>
        <b-form-invalid-feedback id="remail">{{ veeErrors.first('remail') }}</b-form-invalid-feedback>

      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="rpassword"
          v-model="user.password"
          type="password"
          placeholder="Enter password"
          v-validate="{ required: true, min: 3, max: 30}"
          aria-describedby="rpassword"
          :state="validateState('rpassword')"
          data-vv-as="password"
          data-vv-name="rpassword"
        ></b-form-input>
     <b-form-invalid-feedback id="rpassword">{{ veeErrors.first('rpassword') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-button @click="handleOnRegister" type="submit" variant="primary">Register</b-button>
    </b-form>
        </b-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Register',
    data(){
        return {
            user: {
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }
        }
    },
    methods: {
      ...mapActions([
            'register'
        ]),
        validateState(ref) {
            if (
                this.veeFields[ref] &&
                (this.veeFields[ref].dirty || this.veeFields[ref].validated)
            ) {
                return !this.veeErrors.has(ref);
            }
            return null;
        },
        async handleOnRegister(e){
            e.preventDefault();
            const result =  await this.$validator.validateAll();
             if (!result) {
                return;
             }
             const res = await this.register(this.user);
             if(res.msg){
                this.$toast.error(res.msg);
                return;
             }
            this.$router.back();

        }
    },
}
</script>
<style>
    
</style>