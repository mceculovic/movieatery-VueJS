<template>
<div class="container rounded bg-white mt-5 mb-5" v-if="currUser != null">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="../assets/profile.jpg"><span class="font-weight-bold">{{this.currUser.firstName + ' ' + this.currUser.lastName}}</span><span class="text-black-50">{{this.currUser.email}}</span><span> </span></div>
        </div>
        <div class="col-md-5">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">First name:</label>
                    <b-form-input 
                    type="text" class="form-control" placeholder="Enter first name"
                    v-model="userData.firstName"
                    v-validate="{ required: true, min: 3, max: 30}"
                    aria-describedby="firstName"
                    :state="validateState('firstName')"
                    data-vv-as="first name"
                    data-vv-name="firstName"
                     />
                     <b-form-invalid-feedback id="firstName">{{ veeErrors.first('firstName') }}</b-form-invalid-feedback>
                    </div>
                    <div class="col-md-6">
                        <label class="labels">Last name:</label>
                        <b-form-input 
                        type="text" class="form-control" value="" placeholder="Enter last name" v-model="userData.lastName"
                        v-validate="{ required: true, min: 3, max: 30}"
                        aria-describedby="lastName"
                        :state="validateState('lastName')"
                        data-vv-as="last name"
                        data-vv-name="lastName"
                        />
                       <b-form-invalid-feedback id="lastName">{{ veeErrors.first('lastName') }}</b-form-invalid-feedback>

                        </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <label class="labels">Email:</label>
                        <b-form-input type="text" class="form-control" placeholder="Enter email" value="" v-model="userData.email"
                        v-validate="{ required: true, min: 5, max: 50, email: 'email'}"
                        aria-describedby="remail"
                        :state="validateState('remail')"
                        data-vv-as="email"
                        data-vv-name="remail"
                        />
                        <b-form-invalid-feedback id="remail">{{ veeErrors.first('remail') }}</b-form-invalid-feedback>
                        </div>
                    <div class="col-md-12">
                        <label class="labels">Password:</label>
                        <b-form-input type="password" class="form-control" placeholder="Enter password" v-model="userData.password"
                        v-validate="{  min: 3, max: 30}"
                        aria-describedby="rpassword"
                        :state="validateState('rpassword')"
                        data-vv-as="password"
                        data-vv-name="rpassword"
                        />
                     <b-form-invalid-feedback id="rpassword">{{ veeErrors.first('rpassword') }}</b-form-invalid-feedback>
                        </div>

                </div>
            
                <div @click="handleOnSave" class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
      
    </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Profile',
    data(){
        return {
            currUser: null,
            userData: null,
        }
    },
       computed: {
  ...mapState([
    'user'
    ])
  },
  async mounted() {
      if(this.user != null){
          const res = await this.getUserData();
            this.currUser = res;
      }
  },
  
    methods: {
        ...mapActions([
            'updateUser',
            'getUserData',
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
        async handleOnSave(e){
            e.preventDefault();
              const result =  await this.$validator.validateAll();
             if (!result) {
                return;
             }
             let data = {
                 email: this.userData.email, 
                 password: this.userData.password,
                 firstName: this.userData.firstName,
                 lastName: this.userData.lastName,
             };
             if(this.userData.password == ''){
                 delete data.password;
             }
            
             const res = await this.updateUser(data);
             if(res.msg){
                 this.$toast.error(res.msg);
                 return;
             }
        }
    },
    watch: {
        async user(){
            const res = await this.getUserData();
            this.currUser = res;
            
        },
        currUser(nVal){
            const tmp = {
                ...nVal
            };
            tmp.password = '';
            this.userData = tmp;
        }
    }

}
</script>
<style scoped>



.form-control:focus {
    box-shadow: none;
}

.profile-button {
    background: black;
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: white;
    color: black;
}


.back:hover {
    cursor: pointer
}

.labels {
    font-size: 15px
}



</style>