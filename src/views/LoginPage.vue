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
                <div class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                    <div class="w-full h-100">
                         <div class="mt-6">
                            <!-- <div>
                                <label class="block text-gray-700">TOKEN DE SEGURIDAD</label>
                                <input v-model="TOKEN" type="text" id="" placeholder="Ingrese token de seguridad" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus >
                            </div> -->
                            <button type="button" class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6" @click="StoreAndLoginToken">
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
// import { Storage } from '@capacitor/storage';
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
// import axios from "axios";
// import { useStore } from 'vuex'


export default defineComponent({
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    setup() {
        const router = useRouter();
        // const TOKEN: any = ref()
        // const store: any = useStore();

        const redirecMap = async () => {
            // await Storage.set({
            //     key: 'TOKEN',
            //     value: `${TOKEN.value}`,
            // });
            router.push('/folder/home');
        };

        const StoreAndLoginToken: any = async () => {
            try{
            redirecMap()
            }catch(e){
                console.log(e)
            }
        }
        // onIonViewDidEnter(async () => {
        //     if(value){
        //         // store.commit('setTOKEN', value)
        //         router.push('//folder/Inbox')
        //     }
        // })
        return {
            StoreAndLoginToken,
            // TOKEN,
        }
    }
})
</script>
