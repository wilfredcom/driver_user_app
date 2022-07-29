<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <section class="flex flex-col md:flex-row h-screen items-center">
                <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                    <img src="https://source.unsplash.com/random" alt="" class="w-full h-full object-cover">
                </div>
                <div
                    class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                    <div class="w-full h-100">
                        <div class="mt-6">
                            <div class="mt-2">
                                <label class="block text-gray-700">Correo Electronico</label>
                                <input v-model="model_user.email" type="text" placeholder="Ingrese Correo Electronico"
                                    class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                    autofocus>
                            </div>
                            <div class="mt-2">
                                <label class="block text-gray-700">Contraseña</label>
                                <input v-model="model_user.password" type="password" placeholder="Ingrese Contraseña"
                                    class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none">
                            </div>
                            <button type="button"
                                class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                                @click="StoreAndLoginToken">
                                Entrar
                            </button>
                            <p class="mt-5">
                                <a href='/register' class='text-teal-400 hover:underline'>Registrarse</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    toastController
} from '@ionic/vue';
// import { Storage } from '@capacitor/storage';
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from 'vuex'


export default defineComponent({
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    setup() {
        const store: any = useStore();
        const router: any = useRouter();
        const model_user: any = ref({
            email: '',
            password: '',
        })
        let User: any = computed({
            get: () => { return store.getters.user },
            set: (val: any) => { store.commit('setUser', val) }
        });
        
        const StoreAndLoginToken: any = async () => {
            try {

                await axios.post('http://localhost:8000/login', {
                    email: model_user.value.email,
                    password: model_user.value.password
                })
                let { data }: any = await axios.post('http://localhost:8000/api/get-user', { email: model_user.value.email })
                User.value = data
                const toast = await toastController.create({
                    header: "¡Exito!",
                    message: "inicio de session con  exito",
                    position: "top",
                    duration: 1000,
                    color: "success",
                    icon: 'checkmark-done-outline'
                });
                await toast.present();
                router.push('/folder/home')
            } catch (e: any) {
                const toast = await toastController.create({
                    header: "¡Advertencia!",
                    message: e.response.data.message,
                    position: "top",
                    duration: 6000,
                    color: "danger",
                    icon: 'alert-circle-outline'
                });
                await toast.present();
            }
        }
        return {
            StoreAndLoginToken,
            model_user
            // TOKEN,
        }
    }
})
</script>
