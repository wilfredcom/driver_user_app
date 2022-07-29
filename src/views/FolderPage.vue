<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary" class="float-rigth"></ion-menu-button>
                </ion-buttons>
                <ion-title class=" font-bold text-4xl"> TE LLEVO USER</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div class="float-div-mapper" style="top:20%">
                <ion-card v-if="Object.entries(DataAnswereService).length > 0">
                    <ion-card-header v-if="StatusServices != 'solicitando servicio'">
                        <ion-card-title>Buscando Conductor</ion-card-title>
                        <ion-card-subtitle style="position: absolute; top: 25px;">Buscando...</ion-card-subtitle>
                        <img src="/assets/icon/icons8-search.gif"
                            style="    position: absolute; width: 30px; right: 20px; top: 15px;" />
                    </ion-card-header>
                    <ion-card-header v-else>
                        <ion-card-title>Conductor</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                        <ion-item v-if="DataAnswereService.drive != null">
                            <ion-avatar slot="start">
                                <img
                                    src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                            </ion-avatar>
                            <ion-label>
                                <h2>Nombre: {{ JSON.parse(DataAnswereService.drive).name.toUpperCase() }}</h2>
                                <h3 style="position: relative; top: -5px;">Id:
                                    {{ JSON.parse(DataAnswereService.drive).id }}</h3>
                                <p style="position: absolute; top: 45px;">Carro:
                                    {{ JSON.parse(DataAnswereService.drive).carro.toUpperCase() }} </p>
                                <p style="position: relative; top: 6px;">Placa:
                                    {{ JSON.parse(DataAnswereService.drive).placa.toUpperCase() }} </p>
                            </ion-label>
                        </ion-item>
                        <p style="text-align: right;" v-if="DataAnswereService.drive != null">
                            <ion-chip color="danger">
                                <ion-icon name="heart-outline"></ion-icon>
                                <ion-badge color="primary">{{ JSON.parse(DataAnswereService.drive).likes }}</ion-badge>
                            </ion-chip>
                            <ion-chip color="dark">
                                <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                                <ion-badge color="primary">{{ JSON.parse(DataAnswereService.drive).comentarios.length }}
                                </ion-badge>
                            </ion-chip>
                            <ion-chip color="primary">
                                <ion-icon name="car-outline"></ion-icon>
                                <ion-badge color="primary">{{ JSON.parse(DataAnswereService.drive).count_drives }}
                                </ion-badge>
                            </ion-chip>
                        </p>
                        <p style="text-align: center;">
                            <ion-chip color="danger">
                                <ion-label>Rechazar</ion-label>
                                <ion-icon name="close-circle"></ion-icon>
                            </ion-chip>
                            <ion-chip color="success" v-if="DataAnswereService.drive != null" @click="AcepteDrive()">
                                <ion-label>Aceptar</ion-label>
                                <ion-icon name="checkmark-circle"></ion-icon>
                            </ion-chip>
                            <ion-chip v-show="DataAnswereService.drive != null">
                                <ion-label>Mensaje</ion-label>
                                <ion-icon name="paper-plane-outline"></ion-icon>
                            </ion-chip>
                        </p>
                    </ion-card-content>
                </ion-card>
            </div>
            <div id="container" style=" width: 100%; height: 100%; z-index: 1">
                <div id="map" class="map"></div>
                <div class="float-div-mapper">
                    <ion-button color="warning" @click="openModal()"
                        :disabled="StatusServices == 'solicitando servicio'">¿A donde quieres ir?
                    </ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue';
import Modal from '../componentes/modalBuscarDestino.vue'
import { informationCircle } from 'ionicons/icons';
// import axios from 'axios'
// import { Storage } from '@capacitor/storage';
import {
    IonChip,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    modalController,
    IonButton,
    onIonViewWillEnter,
    toastController,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    IonIcon,
    IonBadge,

} from '@ionic/vue';
import { useStore } from 'vuex'

export default defineComponent({
    name: 'FolderPage',
    components: {
        IonChip,
        IonItem,
        IonAvatar,
        IonLabel,
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonCardSubtitle,
        IonIcon,
        IonBadge,
    },
    setup() {
        const store: any = useStore();
        const map: any = computed({
            get: () => { return store.getters.Map },
            set: (val) => { store.commit('setMap', val) }
        });
        const loader: any = computed({
            get: () => { return store.getters.loader },
            set: (val) => { store.commit('setLoader', val) }
        });
        let markertInitPosition: any = computed({
            get: () => { return store.getters.markertInitPosition },
            set: (val: any) => { store.commit('setMarkerInitPosition', val) }
        });
        let searchAddressPI: any = computed({
            get: () => { return store.getters.searchAddressPI },
            set: (val: any) => { store.commit('setsearchAddressPI', val) }
        });
        let modalPrincipal: any = computed({
            get: () => { return store.getters.openModal },
            set: (val: any) => { store.commit('setOpenModal', val) }
        });
        let google: any = computed({
            get: () => { return store.getters.google },
            set: (val: any) => { store.commit('setGoogle', val) }
        });
        let ServicioSolicitado: any = computed({
            get: () => { return store.getters.solicitud_user },
            set: (val: any) => { store.commit('setSolicitudUser', val) }
        });
        let DataAnswereService: any = ref({});
        let StatusServices: any = ref('');



        // const ListenAnswere: any = async () => {
        //     try {
        //         const { value }: any = await Storage.get({ key: 'drive-user' });
        //         if (value) {
        //             var dataStorage = JSON.parse(value)
        //             StatusServices.value = dataStorage.s.estado;
        //             let { data } = await axios.post('https://ftrack.upwaresoft.com/api/get-solicitud-user', { id: dataStorage.id })
        //             DataAnswereService.value = data
        //         }
        //     } catch (e) {
        //         console.log({ e })
        //     }
        // }

        // triggers
        const openModal = async () => {

            modalPrincipal.value = await modalController
                .create({
                    component: Modal,
                    initialBreakpoint: 0.7,
                    breakpoints: [0, 0.5, 1]
                })
            return modalPrincipal.value.present();
        }

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

        const initMap = (): void => {
            try {
                navigator.geolocation.getCurrentPosition(async (data: any) => {
                    google.value = await loader.value.load();
                    const geocoder = new google.value.maps.Geocoder();
                    const infowindow = new google.value.maps.InfoWindow();
                    map.value = new google.value.maps.Map(document.getElementById("map") as HTMLElement, {
                        center: { lat: data.coords.latitude, lng: data.coords.longitude },
                        zoom: 20,
                        zoomControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    });

                    geocoder.geocode({ location: { lat: data.coords.latitude, lng: data.coords.longitude } })
                        .then((response: any) => {
                            if (response.results[0]) {
                                map.value.setZoom(18);
                                markertInitPosition.value = new google.value.maps.Marker({
                                    position: { lat: data.coords.latitude, lng: data.coords.longitude },
                                    map: map.value,
                                });
                                infowindow.setContent(`${response.results[0].formatted_address}`);
                                searchAddressPI.value.name = response.results[0].formatted_address
                                searchAddressPI.value.coords = response.results[0].geometry.location.toJSON()
                                infowindow.open(map.value, markertInitPosition.value);
                            } else {
                                openToast("No results found");
                            }
                        })
                        .catch((e: any) => openToast("Geocoder failed due to: " + e));

                })
            } catch (error) {
                openToast(error)
                console.log({ error })
            }
        }

        const AcepteDrive = async () => {
            try {
                // let { data } = await axios.post('https://ftrack.upwaresoft.com/api/acepted-services-by-user', { id: DataAnswereService.value.id, driver: 'servicio aceptado' })
            } catch (e) {
                console.log({ e })
            }
        }

        onMounted(() => {
            initMap()
        });

        onIonViewWillEnter(() => {
            initMap()
            if (DataAnswereService.value.drive == null) {
                // ListenAnswere()
                // setInterval(() => ListenAnswere(), 2500);
            }
        });

        return {
            openModal,
            ServicioSolicitado,
            StatusServices,
            DataAnswereService,
            AcepteDrive

        }
    },
});
</script>
<style scoped>
.map {
    width: 100%;
    height: 100%;
    z-index: 1;
}

#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}

.float-div-mapper {
    width: 95%;
    height: 10%;
    z-index: 2;
    position: absolute;
    /* float: left; */
    bottom: 3%;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 10px 10px 10px 10px;
}
</style>