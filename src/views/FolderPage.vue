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
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="container" style=" width: 100%; height: 100%; z-index: 1">
                <div id="map" class="map"></div>
                <div class="float-div-mapper">
                    <ion-button color="warning" @click="openModal()">¿A donde quieres ir?</ion-button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import Modal from '../componentes/modalBuscarDestino.vue'
import { informationCircle } from 'ionicons/icons';
import {
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
    toastController
} from '@ionic/vue';
import { useStore } from 'vuex'

export default defineComponent({
    name: 'FolderPage',
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButton,
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
                    // const infowindow = new google.value.maps.InfoWindow();
                    map.value = new google.value.maps.Map(document.getElementById("map") as HTMLElement, {
                        center: { lat: data.coords.latitude, lng: data.coords.longitude },
                        zoom: 18,
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


                                // infowindow.setContent(`${response.results[0].formatted_address}`);
                                searchAddressPI.value.name = response.results[0].formatted_address
                                searchAddressPI.value.coords = response.results[0].geometry.location.toJSON()
                                // infowindow.open(map.value, markertInitPosition.value);
                            } else {
                                window.alert("No results found");
                            }
                        })
                        .catch((e: any) => window.alert("Geocoder failed due to: " + e));

                })
            } catch (error) {
                openToast(error)
                console.log({ error })
            }
        }
        onMounted(() => {
                initMap()
        })
        onIonViewWillEnter(() => {
                initMap()
        })

        return {
            openModal

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