<template>
    <ion-page v-if="MisViajes">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary" class="float-rigth"></ion-menu-button>
                </ion-buttons>
                <ion-title>Mis Viajes</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list>
                <ion-list-header> Viajes Recientes </ion-list-header>
                <ion-item v-for="(viaje, v) in MisViajes" :key="v">
                   <ion-label class="mr-2">
                        <p><ion-icon slot="start" md="calendar" class="mr-2" />{{ viaje.creado.substr(0,10) }}</p>
                        <p> <ion-icon slot="start" md="pin" class="mr-2" />{{ viaje.user.inicio_ruta_address }}</p>
                        <p> <ion-icon slot="start" md="pin" class="mr-2" />{{ viaje.user.final_ruta_address }}</p>
                    </ion-label>
                    <ion-label slot="end" >
                        <h2 slot="end">
                         <p class="text-right" >${{ viaje.user.costo }}</p>
                         <p class="text-xs text-[#cecece]"> {{ viaje.user.estado }} </p>
                        </h2>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, IonListHeader, IonItem, IonLabel} from '@ionic/vue';
// import { Storage } from '@capacitor/storage';
import { defineComponent, computed, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from 'vuex'
import { pin, calendar } from 'ionicons/icons';
import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// import axios from "axios";
// import { useStore } from 'vuex'


export default defineComponent({
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonListHeader, IonItem, IonLabel },
    setup() {
        const store: any = useStore();

        let MisViajes: any = computed({
            get: () => { return store.getters.mis_viajes },
            set: (val: any) => { store.commit('setMisViajes', val) }
        });

        onMounted(async() => {
            await getSolicitudes();            
        })

         const getSolicitudes: any  = async () => {
            try {
                let { data }: any = await axios('https://ftrack.upwaresoft.com/api/get-solicitudes');
                 MisViajes.value = [];
                for (var i = 0; i < data.length; i++) {
                    MisViajes.value.push({user:JSON.parse(data[i].user), creado: data[i].created_at})
                }

            } catch(e) {
                
                console.log(e);
            }
        }

        return {
            MisViajes,
            pin,
            calendar
        }

    }
})
</script>