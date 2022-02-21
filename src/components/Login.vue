<template>
    <div>
        <b-container>
             <b-form>
      <b-form-group
        label="Email:"
        label-for="email"
      >
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Enter email"
          v-validate="{ required: true, min: 3, max: 50, email: 'email' }"
          aria-describedby="email"
          :state="validateState('email')"
          data-vv-as="email"
          data-vv-name="email"
        ></b-form-input>
        <b-form-invalid-feedback id="email">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"
          placeholder="Enter password"
          v-validate="{ required: true, min: 3, max: 30}"
          aria-describedby="password"
          :state="validateState('password')"
          data-vv-as="password"
          data-vv-name="password"
        ></b-form-input>
        <b-form-invalid-feedback id="password">{{ veeErrors.first('password') }}</b-form-invalid-feedback>

      </b-form-group>

      <b-button @click="handleOnLogin" type="submit" variant="primary">Login</b-button>
    </b-form>
        </b-container>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data(){
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions([
            'login'
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
        async handleOnLogin(e){
            e.preventDefault();
             const result =  await this.$validator.validateAll();
             if (!result) {
                return;
             }
            const res = await this.login(this.user);
            if(res.msg){
                this.$toast.error(res.msg);
                return;
            }
             this.$router.back();
        }
    },
}
</script>
<style scoped>

    .form-label{
        font-size: 0.8rem;
        color: rgb(221, 0, 0);
    }
    
</style>