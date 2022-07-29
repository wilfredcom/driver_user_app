<template>
    <ion-header>
        <ion-toolbar class="tb-srch">
            <ion-searchbar placeholder="Ingrese punto de partida" search-icon="map" @ionChange="geocode"
                v-model="searchAddressPI.name" />
            <ion-searchbar placeholder="Ingresa el destino" search-icon="map" @ionChange="geocode2"
                v-model="searchAddressPF.name" />
            <button type="button" @click="ConfirmarRuta"
                class=" w-full text-3xl mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                CONFIRMAR
            </button>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-progress-bar type="indeterminate" v-show="isLoadingProgresBar" />
        <ion-content class="ion-padding" v-if="AddressListOrigin" v-show="AddressListDestiny.length <= 0">
            <ion-label> Origenes: </ion-label>
            <ion-list>
                <ion-item>
                    <ion-label>Resultados {{ AddressListOrigin.length }} de {{ AddressListOrigin.length }}</ion-label>
                </ion-item>
                <ion-item v-for="(addressOrigin, ao) in AddressListOrigin" :key="ao"
                    @click="selectedPointStarted(addressOrigin)">
                    <img src="https://img.icons8.com/material-outlined/34/000000/marker-a.png" class="mr-2" />
                    <ion-label class="ml-2">
                        {{ addressOrigin.name }} <br />
                        <small class="text-[#cecece] text-sm">{{ addressOrigin.shortName }}</small>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-content class="ion-padding" v-if="AddressListDestiny" v-show="AddressListOrigin.length <= 0">
            <ion-label> Destinos: </ion-label>
            <ion-list>
                <ion-item>
                    <ion-label>Resultados {{ AddressListDestiny.length }} de {{ AddressListDestiny.length }}</ion-label>
                </ion-item>
                <ion-item v-for="(addressDestiny, ad) in AddressListDestiny" :key="ad"
                    @click="selectedPointEnd(addressDestiny)">
                    <img src="https://img.icons8.com/material-outlined/34/000000/marker-b.png" class="mr-2" />
                    <ion-label>
                        {{ addressDestiny.name }} <br />
                        <small class="text-[#cecece] text-sm">{{ addressDestiny.shortName }}</small>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-content>
</template>
<script lang="ts">
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonList,
    IonLabel,
    IonItem,
    IonSearchbar,
    IonProgressBar,
    toastController,
    modalController
} from '@ionic/vue';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex'
import { informationCircle } from 'ionicons/icons';
import import_var_modalObcionesDeViaje from '../componentes/modalOpcionesDeViajes.vue'


export default defineComponent({
    setup() {
        /*variables */
        // variables para desplejar la lista de las direcciones 
        const AddressListOrigin: any = ref([]);
        const AddressListDestiny: any = ref([]);
        // variable de la barra de cargando 
        const isLoadingProgresBar: any = ref(false);

        // variable para usar el store de vuex
        const store: any = useStore();
        /* variables computadas del store */
        const map: any = computed({
            get: () => { return store.getters.Map },
            set: (val) => { store.commit('setMap', val) }
        });

        // variables para consultar las direcciones en las apis
        let searchAddressPI: any = computed({
            get: () => { return store.getters.searchAddressPI },
            set: (val: any) => { store.commit('setsearchAddressPI', val) }
        });
        let searchAddressPF: any = computed({
            get: () => { return store.getters.searchAddressPF },
            set: (val: any) => { store.commit('setsearchAddressPF', val) }
        });
        let var_computed_modalOpcionesDeViaje: any = computed({
            get: () => { return store.getters.openModalOpcionesDeViaje },
            set: (val: any) => { store.commit('setOpenModalOpcionesDeViaje', val) }
        });
        let requestServices: any = computed({
            get: () => { return store.getters.modelDataRequestServices },
            set: (val: any) => { store.commit('setModelDataRequestServices', val) }
        });
        let google: any = computed({
            get: () => { return store.getters.google },
            set: (val: any) => { store.commit('setGoogle', val) }
        });

        /* metodos */

        const geocode: any = async () => {
            try {
                isLoadingProgresBar.value = true;
                const geocoder = new google.value.maps.Geocoder();
                geocoder.geocode({ 'address': searchAddressPI.value.name }, function (results: any, status: any) {
                    isLoadingProgresBar.value = true;
                    if (status == 'OK') {
                        for (let i = 0; i < results.length; i++) {
                            const element = results[i];
                            AddressListOrigin.value[i] = {
                                name: element.formatted_address,
                                shortName: element.address_components[0].short_name,
                                coords: element.geometry.location.toJSON()
                            }
                        }
                        isLoadingProgresBar.value = false;
                    }
                });

                isLoadingProgresBar.value = false;


            } catch (error) {
                isLoadingProgresBar.value = false;
                openToast(error)
                console.log('Errorr:', error)
            }
        };
        const geocode2: any = async () => {
            try {
                const geocoder = new google.value.maps.Geocoder();
                geocoder.geocode({ 'address': searchAddressPF.value.name }, function (results: any, status: any) {
                    isLoadingProgresBar.value = true;
                    if (status == 'OK') {
                        for (let i = 0; i < results.length; i++) {
                            const element = results[i];
                            AddressListDestiny.value[i] = {
                                name: element.formatted_address,
                                shortName: element.address_components[0].short_name,
                                coords: element.geometry.location.toJSON()
                            }
                        }
                        isLoadingProgresBar.value = false;
                    }
                });
            } catch (error) {
                isLoadingProgresBar.value = false;
                openToast(error)
                console.log('Errorr:', error)
            }
        }
        const selectedPointStarted = (country: any) => {
            searchAddressPI.value.name = country.name;
            searchAddressPI.value.coords = country.coords;
            AddressListOrigin.value = [];
        }
        const selectedPointEnd = async (country: any) => {
            try {
                searchAddressPF.value.name = country.name;
                searchAddressPF.value.coords = country.coords;
                AddressListDestiny.value = [];


            } catch (error) {
                openToast(error)
            }
        }
        const ConfirmarRuta: any = async () => {
            try {

                const directionsService = new google.value.maps.DirectionsService();
                const directionsRenderer = new google.value.maps.DirectionsRenderer();
                directionsRenderer.setMap(map.value)


                directionsService.route({
                    origin: { query: searchAddressPI.value.name },
                    destination: { query: searchAddressPF.value.name },
                    travelMode: google.value.maps.TravelMode.DRIVING,
                })
                    .then(async (response: any) => {
                        await directionsRenderer.setDirections(response);
                        await SeleccionarTipoDeServicio(response)

                    })
                    .catch((e: any) => openToast(e));

            } catch (error) {
                openToast(error)
                console.log(error)
            }
        }
        const SeleccionarTipoDeServicio: any = (data?: any) => {
            try {
                requestServices.value.distancia = data.routes[0].legs[0].distance

                requestServices.value.tiempo = data.routes[0].legs[0].duration

                requestServices.value.inicio.direccion = data.routes[0].legs[0].start_address
                requestServices.value.inicio.LtnLng = data.routes[0].legs[0].start_location.toJSON()

                requestServices.value.final.direccion = data.routes[0].legs[0].end_address
                requestServices.value.final.LtnLng = data.routes[0].legs[0].end_location.toJSON()

                requestServices.value.costo_servicio = ((data.routes[0].legs[0].distance.value * 1000) / 1000)

                OpenModalOpcionesDeViaje()


            } catch (e) {
                // statements
                console.log(e);
            }
        }
        /* triggers de ionics */
        const openToast: any = async (err: any = null) => {
            const toast = await toastController
                .create({
                    message: err.message,
                    duration: 5000,
                    icon: informationCircle,
                    position: 'top',
                })
            return toast.present();
        };
        const OpenModalOpcionesDeViaje = async () => {

            var_computed_modalOpcionesDeViaje.value = await modalController
                .create({
                    component: import_var_modalObcionesDeViaje,
                    initialBreakpoint: 0.5,
                    breakpoints: [0, 0.5, 1]
                })
            return var_computed_modalOpcionesDeViaje.value.present();
        }


        return {
            AddressListOrigin,
            searchAddressPI,
            selectedPointStarted,
            geocode,
            isLoadingProgresBar,
            // printCurrentPosition,
            geocode2,
            searchAddressPF,
            AddressListDestiny,
            selectedPointEnd,
            ConfirmarRuta,
            OpenModalOpcionesDeViaje,
            SeleccionarTipoDeServicio
        }
    },

    components: { IonContent, IonHeader, IonToolbar, IonList, IonLabel, IonItem, IonSearchbar, IonProgressBar }
});
</script>
<style scoped>
.srch-bar {
    margin-bottom: 5px;
}

.tb-srch {
    padding: 20px;
}

ion-icon {
    color: blue;
}
</style>