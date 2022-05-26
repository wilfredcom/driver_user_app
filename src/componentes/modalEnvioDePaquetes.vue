<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-button color="danger"><img src="https://img.icons8.com/ios/30/000000/circled-left.png" /></ion-button>
                </ion-buttons>
                <ion-title class="text-2xl"> Envio de Paquetes </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="h-screen">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large"></ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="m-4 max-h-fit max-w-full  text-[#fff] p-2 shadow-[0_10px_10px_1px_rgba(0,0,0,0.3)] relative rounded-lg ">
                <div class="grid grid-cols-12">
                    <div class="col-span-2">
                        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png" />
                    </div>
                    <div class="col-span-10  mt-2 ml-2">
                        <div class=" text-center  uppercase text-[#000] text-3xl font-bold align-middle mb-5 ">
                            <p>Formulario</p>
                            <p class="text-lg" >Costo Total: ${{ Intl.NumberFormat().format( costo_final_envio_de_paquetes)}}</p>
                        </div>
                        <div class=" text-left divide-y uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <ion-item>
                                <ion-label position="floating"  >Cantidad</ion-label>
                                <ion-input type="number" v-model="paquete.cantidad"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating" >Alto(cm)</ion-label>
                                <ion-input type="number"  v-model="paquete.alto" ></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating" >Ancho(cm)</ion-label>
                                <ion-input type="number"  v-model="paquete.ancho"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating"  >Largo(cm)</ion-label>
                                <ion-input type="number"  v-model="paquete.largo"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating" >Peso(g)</ion-label>
                                <ion-input type="number"  v-model="paquete.peso" ></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating" >Descripción</ion-label>
                                <ion-textarea  v-model="paquete.descripcion"></ion-textarea>
                            </ion-item>
                        </div>
                    </div>
                    <div class="col-span-12  text-[#000] align-middle text-center self-center font-bold ml-2">
                         <button class="mt-2 mb-2 w-full  bg-green-300 p-2 rounded-xl hover:bg-green-500  text-white font-semibold" @click="servicioConfirmado">
                            <p>Solicitar</p>
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonButton,
    IonPage,
    IonButtons,
    IonTitle,
    IonInput,
    IonItem,
    IonLabel, 
    IonTextarea,
} from '@ionic/vue';
import { useStore } from 'vuex'
import axios from 'axios'
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
        IonTitle,
        IonInput,
        IonItem,
        IonLabel,
        IonTextarea
    },
    setup() {
        const store: any = useStore();
        const paquete: any  = ref({
            cantidad: 0,
            alto: 0,
            ancho: 0,
            largo:0,
            peso: 0,
            descripcion: ''
        })

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

        let modalPrincipal: any = computed({
            get: () => { return store.getters.openModal },
            set: (val: any) => { store.commit('setOpenModal', val) }
        });
        const costo_final_envio_de_paquetes: any = computed({
            get: () => { 
                var costo = parseInt(ServicioSolicitado.value.costo);
                var cal = parseInt((costo + (
                                                paquete.value.cantidad * 
                                                ( parseInt(paquete.value.alto) + parseInt(paquete.value.ancho) + parseInt(paquete.value.largo) + parseInt(paquete.value.peso) )
                                            )
                                    ))
                return cal;
            },
            set: (val: any) => { 
                ServicioSolicitado.value.costo = val
            }
        });

        const servicioConfirmado: any = async (data ? : any) => {

                    
                ServicioSolicitado.value.type_solicitud = "envio de paquetes", // taxi || envio de paquetes
                ServicioSolicitado.value.inicio_ruta_coords = requestServices.value.inicio.LtnLng,
                ServicioSolicitado.value.final_ruta_coords = requestServices.value.final.LtnLng,
                ServicioSolicitado.value.inicio_ruta_address = requestServices.value.inicio.direccion,
                ServicioSolicitado.value.final_ruta_address = requestServices.value.final.direccion,
                ServicioSolicitado.value.distancia_servicio = requestServices.value.distancia, // en kilometros/metros
                ServicioSolicitado.value.tiempo_aproximado_de_viaje = requestServices.value.tiempo, // minutos
                ServicioSolicitado.value.costo = costo_final_envio_de_paquetes,
                ServicioSolicitado.value.estado = "solicitando servicio", // solicitando servicio || servicio aceptado  || servicio iniciado || servicio finalizado 

                ServicioSolicitado.value.paquete.alto =  paquete.value.alto,
                ServicioSolicitado.value.paquete.largo =  paquete.value.largo,
                ServicioSolicitado.value.paquete.ancho =  paquete.value.ancho,
                ServicioSolicitado.value.paquete.peso =  paquete.value.peso,
                ServicioSolicitado.value.paquete.descripcion =  paquete.value.descripcion
                ServicioSolicitado.value.paquete.cantidad =  paquete.value.cantidad

                var_computed_modalOpcionesDeViaje.value.dismiss().then(() => {
                    var_computed_modalOpcionesDeViaje.value = null;
                });

            modalPrincipal.value.dismiss().then(() => {
                modalPrincipal.value = null;
            });


            requestServices.value.tipo_de_servicio = data

            await axios.post('https://ftrack.upwaresoft.com/api/store-solicitud', { user: JSON.stringify(ServicioSolicitado.value) })
            // getSolicitudes();
        }
        // const getSolicitudes: any  = async () => {
        //     try {
        //         let { data }: any = await axios('https://ftrack.upwaresoft.com/api/get-solicitudes');

        //         for (var i = 0; i < data.length; i++) {
        //             MisViajes.value.push({user:JSON.parse(data[i].user), creado: data[i].created_at})
        //         }

        //     } catch(e) {

        //         console.log(e);
        //     }
        // }

        return {
            servicioConfirmado,
            requestServices,
            ServicioSolicitado,
            paquete,
            costo_final_envio_de_paquetes
        }
    }
})
</script>