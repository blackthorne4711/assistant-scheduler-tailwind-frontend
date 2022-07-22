<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

const form = reactive({
  login: 'test@stallhjalpen.se',
  pass: 'nagotkonstigt',
})

const router = useRouter()

const submit = () => {
//function onLogin(values, { setFieldValue, resetForm }) {
  // const mainStore = useMainStore()
  const authStore = useAuthStore()
  // const router = useRouter()

  console.log('Authentication attempt')
  authStore
    .login({email: form.login, password: form.pass})
    .then((userCredentials) => {
      console.log('Authentication successful')
      authStore.user = userCredentials.user
      authStore.userEmail = userCredentials.user.email
      console.log(authStore.userEmail)
      form.password = ''
      basiclogin()
      router.push({path: '/dashboard'})
    }).catch((error) => {
      console.log(error)
      switch (error.code) {
        case "auth/invalid-email":
          console.log('Invalid email')
          //setFieldValue("email", "");
          break;
        case "auth/user-disabled":
          console.log('Disabled user')
          break;
        default:
          console.log('Invalid user/pass')
          break;
      }

      //setFieldValue("password", "")
    })

  // authStore
  //   .login({email: form.login, password: form.pass})
  //   .then((userCredentials) => {
  //     console.log('Authentication successful')
  //     authStore.user = userCredentials.user
  //     resetForm()

  //     router.push({ name: "home" })
  //   })
  //   .catch((error) => {
  //     switch (error.code) {
  //       case "auth/invalid-email":
  //         console.log('Invalid email')
  //         //setFieldValue("email", "");
  //         break;
  //       case "auth/user-disabled":
  //         console.log('Disabled user')
  //         break;
  //       default:
  //         console.log('Invalid user/pass')
  //         break;
  //     }
  //     showAlert.value = true;
  //     setFieldValue("password", "");
  //   })
  // }

  // firebaseService
  // .loginWithBasicAuth(form.login, form.pass)
  // .then(() => {
  //   console.log('Successfully logged in')
  //   firebaseService.onAuth(mainStore)
  //   router.push('/dashboard')
  // })
  // .catch((err) => {
  //   console.log(err)
  //   console.log(
  //     'Error loggin in - ' + err.code + ' (' + err.message + ')',
  //   )
  //   // setTimeout(this.$toast.clear, 3000)
  //   // this.$toast.error(
  //   //   'Inloggningen misslyckades. Kontrollera email och lösenord, och försök igen.',
  //   // )
  // })
}

function basiclogin() {
  console.log('TEST')
}

</script>

<template>
  <SectionFullScreen
    v-slot="{ cardClass, cardRounded }"
    bg="login"
  >
    <CardBox
      :class="cardClass"
      :rounded="cardRounded"
      form
      @submit.prevent="submit"
    >
      <FormField
        label="Email"
        help="Ange ditt email för att logga in"
      >
        <FormControl
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </FormField>

      <FormField
        label="Lösenord"
        help="Ange ditt lösenord"
      >
        <FormControl
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </FormField>

      <BaseDivider />

      <BaseButtons>
        <BaseButton
          type="submit"
          color="info"
          label="Login"
          @click="basiclogin"
        />
      </BaseButtons>
    </CardBox>
  </SectionFullScreen>
</template>
