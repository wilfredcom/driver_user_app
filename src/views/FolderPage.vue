<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-menu-button color="primary" class="float-rigth"></ion-menu-button>
        </ion-buttons>
        <ion-title class="font-bold text-4xl"> TE LLEVO USER</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="float-div-mapper" style="top: 10%">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Buscando Conductor</ion-card-title>
            <ion-card-subtitle style="position: absolute; top: 25px">Buscando...</ion-card-subtitle>
            <img src="/assets/icon/icons8-search.gif" style="position: absolute; width: 30px; right: 20px; top: 15px" />
          </ion-card-header>
          <ion-card-header>
            <ion-card-title>Conductor</ion-card-title>
          </ion-card-header>
          <!-- <ion-card-content>
            <ion-item v-if="DataAnswereService.drive != null">
              <ion-avatar slot="start">
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
              </ion-avatar>
              <ion-label>
                <h2>
                  Nombre:
                  {{ JSON.parse(DataAnswereService.drive).name.toUpperCase() }}
                </h2>
                <h3 style="position: relative; top: -5px">
                  Id: {{ JSON.parse(DataAnswereService.drive).id }}
                </h3>
                <p style="position: absolute; top: 45px">
                  Carro:
                  {{ JSON.parse(DataAnswereService.drive).carro.toUpperCase() }}
                </p>
                <p style="position: relative; top: 6px">
                  Placa:
                  {{ JSON.parse(DataAnswereService.drive).placa.toUpperCase() }}
                </p>
              </ion-label>
            </ion-item>
            <p style="text-align: right" v-if="DataAnswereService.drive != null">
              <ion-chip color="danger">
                <ion-icon name="heart-outline"></ion-icon>
                <ion-badge color="primary">{{
                JSON.parse(DataAnswereService.drive).likes
                }}</ion-badge>
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
            <p style="text-align: center">
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
          </ion-card-content> -->
        </ion-card>
      </div>
      <div id="container" style="width: 100%; height: 100%; z-index: 1">
        <div id="map" class="map"></div>
        <div class="float-div-mapper">
          <ion-button color="warning" @click="setOpen(true)" expand="block">
            ¿A donde quieres ir?
          </ion-button>
        </div>
      </div>
      <ion-modal :is-open="isOpen" :initial-breakpoint="0.75" :breakpoints="[0.75, 0.5, 0.75]"
        :backdrop-breakpoint="0.5">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click="setOpen(false)">
                <img src="https://img.icons8.com/ios/30/000000/circled-left.png" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-buttons slot="end">
            <ion-button color="danger"><img src="https://img.icons8.com/ios/30/000000/circled-left.png" />
            </ion-button>
          </ion-buttons>
          <ion-slides :pager="false" :show-pager="false" :options="slideOpts">
            <ion-slide>
              <ion-card class="w-full h-24">
                <ion-row>
                  <ion-col size="3">
                    <img src="https://img.icons8.com/stickers/100/000000/car-theft.png" />
                  </ion-col>
                  <ion-col size="9">
                    <ion-card-header>
                      <ion-card-title>Solicitud de Taxi</ion-card-title>
                    </ion-card-header>
                  </ion-col>
                </ion-row>
              </ion-card>
            </ion-slide>
            <ion-slide>
              <ion-card class="w-full h-24">
                <ion-row>
                  <ion-col size="3">
                    <img
                            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png" />
                  </ion-col>
                  <ion-col size="9">
                    <ion-card-header>
                      <ion-card-title>Solicitud de Envio de paquete</ion-card-title>
                    </ion-card-header>
                  </ion-col>
                </ion-row>
              </ion-card>
            </ion-slide>
          </ion-slides>
          <ion-searchbar placeholder="Ingrese punto de partida" search-icon="map" @ionChange="geocode"
            v-model="searchAddressPI.name" />
          <ion-searchbar placeholder="Ingresa el destino" search-icon="map" @ionChange="geocode2"
            v-model="searchAddressPF.name" />
          <ion-item>
            <ion-label>Metodo de pago</ion-label>
            <ion-select interface="popover" placeholder="Selecione metodo de pago">
              <IonSelectOption value="efectivo"> Efectivo</IonSelectOption>
              <IonSelectOption value="credito">Credito</IonSelectOption>
            </ion-select>
          </ion-item>
          <button type="button" @click="ConfirmarRuta"
            class="w-full text-3xl mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            CONFIRMAR
          </button>
          <ion-progress-bar type="indeterminate" v-show="isLoadingProgresBar" />
          <ion-content class="ion-padding" v-if="AddressListOrigin" v-show="AddressListDestiny.length <= 0">
            <ion-label> Origenes: </ion-label>
            <ion-list>
              <ion-item>
                <ion-label>Resultados {{ AddressListOrigin.length }} de
                  {{ AddressListOrigin.length }}</ion-label>
              </ion-item>
              <ion-item v-for="(addressOrigin, ao) in AddressListOrigin" :key="ao"
                @click="selectedPointStarted(addressOrigin)">
                <img src="https://img.icons8.com/material-outlined/34/000000/marker-a.png" class="mr-2" />
                <ion-label class="ml-2">
                  {{ addressOrigin.name }} <br />
                  <small class="text-[#cecece] text-sm">{{
                  addressOrigin.shortName
                  }}</small>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
          <ion-content class="ion-padding" v-if="AddressListDestiny" v-show="AddressListOrigin.length <= 0">
            <ion-label> Destinos: </ion-label>
            <ion-list>
              <ion-item>
                <ion-label>Resultados {{ AddressListDestiny.length }} de
                  {{ AddressListDestiny.length }}</ion-label>
              </ion-item>
              <ion-item v-for="(addressDestiny, ad) in AddressListDestiny" :key="ad"
                @click="selectedPointEnd(addressDestiny)">
                <img src="https://img.icons8.com/material-outlined/34/000000/marker-b.png" class="mr-2" />
                <ion-label>
                  {{ addressDestiny.name }} <br />
                  <small class="text-[#cecece] text-sm">{{
                  addressDestiny.shortName
                  }}</small>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { informationCircle } from "ionicons/icons";
// eslint-disable-next-line
const standingMan = require("../../public/assets/icon/standing-man.png");
// import axios from 'axios'
import { Storage } from "@capacitor/storage";
import {
  // IonChip,
  IonItem,
  // IonAvatar,
  IonLabel,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  //   modalController,
  IonButton,
  onIonViewWillEnter,
  toastController,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  // IonCardContent,
  IonCardSubtitle,
  // IonIcon,
  // IonBadge,
  IonList,
  IonModal,
  IonProgressBar,
  IonSearchbar,
  modalController,
  IonSelect,
  IonSelectOption,
  IonSlides,
  IonSlide,
  IonRow,
  IonCol
} from "@ionic/vue";
import { useStore } from "vuex";
// eslint-disable-next-line
var EndFlag = require("../../public/assets/icon/flag.png");
// eslint-disable-next-line
var BlackDotPulse = require("../../public/assets/icon/black-dot-pulse.gif");
import import_var_modalObcionesDeViaje from "../componentes/modalOpcionesDeViajes.vue";
export default defineComponent({
  name: "FolderPage",
  components: {
    // IonChip,
    IonItem,
    // IonAvatar,
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
    // IonCardContent,
    IonCardSubtitle,
    // IonIcon,
    // IonBadge,
    IonList,
    IonModal,
    IonProgressBar,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSlides,
    IonSlide,
    IonRow,
    IonCol
  },
  data() {
    return {
      isOpen: false,
    };
  },
  setup() {
    /*variables */
    const store: any = useStore();
    const map: any = computed({
      get: () => {
        return store.getters.Map;
      },
      set: (val) => {
        store.commit("setMap", val);
      },
    });
    const loader: any = computed({
      get: () => {
        return store.getters.loader;
      },
      set: (val) => {
        store.commit("setLoader", val);
      },
    });
    const searchAddressPI: any = computed({
      get: () => {
        return store.getters.searchAddressPI;
      },
      set: (val: any) => {
        store.commit("setsearchAddressPI", val);
      },
    });
    const google: any = computed({
      get: () => {
        return store.getters.google;
      },
      set: (val: any) => {
        store.commit("setGoogle", val);
      },
    });
    const ServicioSolicitado: any = computed({
      get: () => {
        return store.getters.solicitud_user;
      },
      set: (val: any) => {
        store.commit("setSolicitudUser", val);
      },
    });
    const DataAnswereService: any = ref({});
    const StatusServices: any = ref("");
    const markertFinalPosition: any = computed({
      get: () => {
        return store.getters.markertFinalPosition;
      },
      set: (val: any) => {
        store.commit("setMarkerFinalPosition", val);
      },
    });
    const var_computed_solicitud_usuario: any = computed({
      get: () => {
        return store.getters.solicitud_Usuario;
      },
      set: (val: any) => {
        store.commit("setSolicitudUsuario", val);
      },
    });
    const AddressListOrigin: any = ref([]);
    const AddressListDestiny: any = ref([]);
    const isLoadingProgresBar: any = ref(false);
    const searchAddressPF: any = computed({
      get: () => {
        return store.getters.searchAddressPF;
      },
      set: (val: any) => {
        store.commit("setsearchAddressPF", val);
      },
    });
    // const requestServices: any = computed({
    //   get: () => {
    //     return store.getters.modelDataRequestServices;
    //   },
    //   set: (val: any) => {
    //     store.commit("setModelDataRequestServices", val);
    //   },
    // });
    const var_computed_modalOpcionesDeViaje: any = computed({
      get: () => {
        return store.getters.openModalOpcionesDeViaje;
      },
      set: (val: any) => {
        store.commit("setOpenModalOpcionesDeViaje", val);
      },
    });

    const customPopoverOptions = {
      header: 'Metodo de pago',
      subHeader: '',
      message: ''
    };

    const slideOpts = {
      initialSlide: 1,
      speed: 400
    };

    /* metodos */
    const AcepteDrive = async () => {
      try {
        // let { data } = await axios.post('https://ftrack.upwaresoft.com/api/acepted-services-by-user', { id: DataAnswereService.value.id, driver: 'servicio aceptado' })
      } catch (e) {
        console.log({ e });
      }
    };
    const geocode: any = async () => {
      try {
        isLoadingProgresBar.value = true;
        const geocoder = new google.value.maps.Geocoder();
        geocoder.geocode(
          { address: searchAddressPI.value.name },
          function (results: any, status: any) {
            isLoadingProgresBar.value = true;
            if (status == "OK") {
              for (let i = 0; i < results.length; i++) {
                const element = results[i];
                AddressListOrigin.value[i] = {
                  name: element.formatted_address,
                  shortName: element.address_components[0].short_name,
                  coords: element.geometry.location.toJSON(),
                };
              }
              isLoadingProgresBar.value = false;
            }
          }
        );

        isLoadingProgresBar.value = false;
      } catch (error) {
        isLoadingProgresBar.value = false;
        openToast(error);
        console.log("Errorr:", error);
      }
    };
    const geocode2: any = async () => {
      try {
        const geocoder = new google.value.maps.Geocoder();
        geocoder.geocode(
          { address: searchAddressPF.value.name },
          function (results: any, status: any) {
            isLoadingProgresBar.value = true;
            if (status == "OK") {
              for (let i = 0; i < results.length; i++) {
                const element = results[i];
                AddressListDestiny.value[i] = {
                  name: element.formatted_address,
                  shortName: element.address_components[0].short_name,
                  coords: element.geometry.location.toJSON(),
                };
              }
              isLoadingProgresBar.value = false;
            }
          }
        );
      } catch (error) {
        isLoadingProgresBar.value = false;
        openToast(error);
        console.log("Errorr:", error);
      }
    };
    const selectedPointStarted = (country: any) => {
      searchAddressPI.value.name = country.name;
      searchAddressPI.value.coords = country.coords;
      AddressListOrigin.value = [];
    };
    const selectedPointEnd = async (country: any) => {
      try {
        searchAddressPF.value.name = country.name;
        searchAddressPF.value.coords = country.coords;
        AddressListDestiny.value = [];
      } catch (error) {
        openToast(error);
      }
    };
    const ConfirmarRuta: any = async () => {
      try {
        const directionsService = new google.value.maps.DirectionsService();
        const directionsRenderer = new google.value.maps.DirectionsRenderer({ suppressMarkers: true });
        directionsRenderer.setMap(map.value);
        const response = await directionsService.route({
          origin: { query: searchAddressPI.value.name },
          destination: { query: searchAddressPF.value.name },
          travelMode: google.value.maps.TravelMode.DRIVING,
        })
        const start = {
          url: BlackDotPulse,
          size: new google.value.maps.Size(40, 40),
          origin: new google.value.maps.Point(0, 0),
          anchor: new google.value.maps.Point(20, 40),
        };

        const end = {
          url: EndFlag,
          size: new google.value.maps.Size(50, 50),
          origin: new google.value.maps.Point(0, 0),
          anchor: new google.value.maps.Point(5, 42),
        };

        await directionsRenderer.setDirections(response);
        new google.value.maps.Marker({
          position: response.routes[0].overview_path[0].toJSON(),
          map: map.value,
          icon: start,
        });
        new google.value.maps.Marker({
          position: response.routes[0].overview_path[response.routes[0].overview_path.length - 1].toJSON(),
          map: map.value,
          icon: end,
        });
        await SeleccionarTipoDeServicio(response);

      } catch (error) {
        openToast(error);
        console.log(error);
      }
    };
    const SeleccionarTipoDeServicio: any = (data?: any) => {
      try {
        console.log({ data })
        // requestServices.value.distancia         = data.routes[0].legs[0].distance;
        // requestServices.value.tiempo            = data.routes[0].legs[0].duration;
        // requestServices.value.inicio.direccion  = data.routes[0].legs[0].start_address; 
        // requestServices.value.inicio.LtnLng     = data.routes[0].legs[0].start_location.toJSON();
        // requestServices.value.final.direccion   = data.routes[0].legs[0].end_address;
        // requestServices.value.final.LtnLng      = data.routes[0].legs[0].end_location.toJSON();
        // requestServices.value.costo_servicio    = (data.routes[0].legs[0].distance.value * 1000) / 1000;

        OpenModalOpcionesDeViaje();
      } catch (e) {
        // statements
        console.log(e);
      }
    };
    const OpenModalOpcionesDeViaje = async () => {
      var_computed_modalOpcionesDeViaje.value = await modalController.create({
        component: import_var_modalObcionesDeViaje,
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5, 1],
      });
      return var_computed_modalOpcionesDeViaje.value.present();
    };
    // triggers
    const openModal = async () => {
      //     modalPrincipal.value = await modalController.create({
      //             component: ModalDF,
      //             initialBreakpoint: 0.7,
      //             breakpoints: [0, 0.5, 1]
      //         })
      //     return modalPrincipal.value.present()
    };

    const openToast: any = async (err: any = null) => {
      const toast = await toastController.create({
        message: err.message,
        duration: 5000,
        icon: informationCircle,
        position: "top",
      });
      return toast.present();
    };

    const initMap = (): void => {
      try {
        navigator.geolocation.getCurrentPosition(async (data: any) => {
          google.value = await loader.value.load();
          const geocoder = new google.value.maps.Geocoder();
          map.value = new google.value.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
              center: { lat: data.coords.latitude, lng: data.coords.longitude },
              zoom: 20,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
            }
          );

          geocoder
            .geocode({
              location: {
                lat: data.coords.latitude,
                lng: data.coords.longitude,
              },
            })
            .then((response: any) => {
              if (response.results[0]) {
                map.value.setZoom(18);
                markertFinalPosition.value = new google.value.maps.Marker({
                  position: {
                    lat: data.coords.latitude,
                    lng: data.coords.longitude,
                  },
                  icon: standingMan,
                });
                markertFinalPosition.value.setMap(map.value);
                searchAddressPI.value.name =
                  response.results[0].formatted_address;
                searchAddressPI.value.coords =
                  response.results[0].geometry.location.toJSON();
              } else {
                openToast("No results found");
              }
            })
            .catch((e: any) => openToast("Geocoder failed due to: " + e));
        });
      } catch (error) {
        openToast(error);
        console.log({ error });
      }
    };

    const getIfExistRequestUser: any = async () => {
      const StoreRequest: any = await Storage.get({ key: "drive-user" });
      if (StoreRequest.value) {
        var_computed_solicitud_usuario.value = JSON.parse(StoreRequest.value);
      }
    };

    onMounted(() => {
      initMap();
      getIfExistRequestUser();
    });

    onIonViewWillEnter(() => {
      initMap();
      if (DataAnswereService.value.drive == null) {
        // ListenAnswere()
        // setInterval(() => ListenAnswere(), 2500)
      }
    });

    return {
      openModal,
      ServicioSolicitado,
      StatusServices,
      DataAnswereService,
      AcepteDrive,
      var_computed_solicitud_usuario,
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
      SeleccionarTipoDeServicio,
      customPopoverOptions,
      slideOpts
    };
  },
  methods: {
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
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
