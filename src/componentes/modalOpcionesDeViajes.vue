<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-button color="danger"><img src="https://img.icons8.com/ios/30/000000/circled-left.png" />
                    </ion-button>
                </ion-buttons>
                <ion-title class="text-2xl"> Opciones de Viaje </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="h-screen">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large"></ion-title>
                </ion-toolbar>
            </ion-header>
            <div
                class="m-4 max-h-fit max-w-full  text-[#fff] p-2 shadow-[0_10px_10px_1px_rgba(0,0,0,0.3)] relative rounded-lg ">
                <div class="grid grid-cols-12">
                    <div class="col-span-2">
                        <img src="https://img.icons8.com/stickers/100/000000/car-theft.png" />
                    </div>
                    <div class="col-span-10  mt-2 ml-2">
                        <div class=" text-center  uppercase text-[#000] text-3xl font-bold align-middle mb-5 ">
                            <p>taxi</p>
                        </div>
                        <div class=" text-left divide-y uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <p>Inicio: {{ requestServices.inicio.direccion }} </p>
                            <p>Destino: {{ requestServices.final.direccion }} </p>
                            <p>Tiempo(Aprox): {{ requestServices.tiempo.text }} </p>
                            <p>Km.: {{ requestServices.distancia.text }} </p>
                        </div>
                    </div>
                    <div class="col-span-12  text-[#000] align-middle text-center self-center font-bold ml-2">
                        <button
                            class="mt-2 mb-2 w-full  bg-green-300 p-2 rounded-xl hover:bg-green-500  text-white font-semibold"
                            @click="servicioSelected('taxi')">
                            <p>Solicitar</p>
                            <p> ${{ Intl.NumberFormat().format(requestServices.costo_servicio) }}</p>
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="m-4 max-h-fit max-w-full  text-[#fff] p-2 shadow-[0_10px_10px_1px_rgba(0,0,0,0.3)] relative rounded-lg ">
                <div class="grid grid-cols-12">
                    <div class="col-span-2 ">
                        <img
                            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png" />
                    </div>
                    <div class="col-span-10  mt-2 ml-2">
                        <div class=" text-left  uppercase text-[#000] text-2xl font-bold align-middle mb-5 ">
                            <p>envio de paquetes</p>
                        </div>
                        <div class=" divide-y text-left  uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <p>Inicio: {{ requestServices.inicio.direccion }} </p>
                            <p>Destino: {{ requestServices.final.direccion }} </p>
                            <p>Tiempo(Aprox): {{ requestServices.tiempo.text }} </p>
                            <p>Km.: {{ requestServices.distancia.text }} </p>
                        </div>
                    </div>
                    <div class="col-span-12  text-[#000] align-middle text-center self-center font-bold ml-2">
                        <button
                            class="mt-2 mb-2 w-full  bg-green-300 p-2 rounded-xl hover:bg-green-500  text-white font-semibold"
                            @click="servicioSelected('envio_paquete')">
                            <p>Solicitar</p>
                            <p> ${{ Intl.NumberFormat(['ban', 'id']).format(requestServices.costo_servicio) }}</p>
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Storage } from '@capacitor/storage';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonPage,
    IonButtons,
    IonTitle,
    modalController,
    toastController
} from '@ionic/vue';
import { useStore } from 'vuex'
import axios from 'axios'
import import_var_envio_de_paquetes from '../componentes/modalEnvioDePaquetes.vue'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default defineComponent({
    components: {
        IonContent,
        IonHeader,
        IonToolbar,
        IonButton,
        IonPage,
        IonButtons,
        IonTitle
    },
    setup() {
        const store: any = useStore();
        // const model_servicio: any = computed({
        //     get: () => { return store.getters.mis_viajes },
        //     set: (val: any) => { store.commit('setSolicitudUser', val) }
        // });

        let requestServices: any = computed({
            get: () => { return store.getters.modelDataRequestServices },
            set: (val: any) => { store.commit('setModelDataRequestServices', val) }
        });

        let ServicioSolicitado: any = computed({
            get: () => { return store.getters.solicitud_user },
            set: (val: any) => { store.commit('setSolicitudUser', val) }
        });

        // let MisViajes: any = computed({
        //     get: () => { return store.getters.mis_viajes },
        //     set: (val: any) => { store.commit('setMisViajes', val) }
        // });

        let var_computed_modalOpcionesDeViaje: any = computed({
            get: () => { return store.getters.openModalOpcionesDeViaje },
            set: (val: any) => { store.commit('setOpenModalOpcionesDeViaje', val) }
        });

        let User: any = computed({
            get: () => { return store.getters.user },
            set: (val: any) => { store.commit('setUser', val) }
        });

        let map: any = computed({
            get: () => { return store.getters.Map },
            set: (val: any) => { store.commit('setMap', val) }
        });

        let modalPrincipal: any = computed({
            get: () => { return store.getters.openModal },
            set: (val: any) => { store.commit('setOpenModal', val) }
        });

        let var_computed_envio_de_paquetes: any = computed({
            get: () => { return store.getters.openModalEnvioDePaquetes },
            set: (val: any) => { store.commit('setopenModalEnvioDePaquetes', val) }
        });

        const servicioSelected: any = async (dataS?: any) => {

            try {

                ServicioSolicitado.value.type_solicitud = dataS, // taxi || envio de paquetes
                ServicioSolicitado.value.inicio_ruta_coords = requestServices.value.inicio.LtnLng,
                ServicioSolicitado.value.final_ruta_coords = requestServices.value.final.LtnLng,
                ServicioSolicitado.value.inicio_ruta_address = requestServices.value.inicio.direccion,
                ServicioSolicitado.value.final_ruta_address = requestServices.value.final.direccion,
                ServicioSolicitado.value.distancia_servicio = requestServices.value.distancia,// en kilometros/metros
                ServicioSolicitado.value.tiempo_aproximado_de_viaje = requestServices.value.tiempo,// minutos
                ServicioSolicitado.value.costo = requestServices.value.costo_servicio,
                // ServicioSolicitado.value.mensajes = [],
                ServicioSolicitado.value.estado = "solicitando servicio"; // solicitando servicio || servicio aceptado  || servicio iniciado || servicio finalizado 
                ServicioSolicitado.value.user_id = User.value.id

                if (dataS == 'envio_paquete') return OpenModalEnvioDePaquetes()

                var_computed_modalOpcionesDeViaje.value.dismiss().then(() => {
                    var_computed_modalOpcionesDeViaje.value = null;
                });

                modalPrincipal.value.dismiss().then(() => {
                    modalPrincipal.value = null;
                });


                console.log({ ServicioSolicitado })

                let { data }: any = await axios.post('http://localhost:8000/api/store-servicio', { ...ServicioSolicitado.value })
                ServicioSolicitado.value = data

                await Storage.set({
                    key: 'drive-user',
                    value: JSON.stringify({ estado: ServicioSolicitado.value.estado, id: data.id, s: data }),
                });

            } catch (e: any)  {

                
                await map.value.setMap(null)

                const toast = await toastController.create({
                    header: "¡Error!",
                    message: e.response.data.message,
                    position: "top",
                    duration: 2000,
                    color: "danger",
                    icon: 'alert-circle-outline'
                });
                await toast.present();
            }
        }




        const OpenModalEnvioDePaquetes = async () => {

            var_computed_envio_de_paquetes.value = await modalController
                .create({
                    component: import_var_envio_de_paquetes,
                    initialBreakpoint: 0.5,
                    breakpoints: [0, 0.5, 1]
                })
            return var_computed_envio_de_paquetes.value.present();
        }
        return {
            servicioSelected,
            requestServices,
            ServicioSolicitado
        }
    }
})
</script>