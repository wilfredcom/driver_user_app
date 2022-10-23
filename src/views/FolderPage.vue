<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-menu-button
            color="primary"
            class="float-rigth"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="font-bold text-4xl"> TE LLEVO USER</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="float-div-mapper" style="top: 10%">
        <!-- buscando conductor -->
        <ion-card>
          <ion-card-header
            v-if="
              var_computed_solicitud_usuario != null &&
              Object.entries(var_computed_solicitud_usuario).length > 0
            "
          >
            <ion-card-title>Buscando Conductor</ion-card-title>
            <ion-card-subtitle style="position: absolute; top: 25px">
              Buscando...
            </ion-card-subtitle>
            <img
              src="/assets/icon/icons8-search.gif"
              style="position: absolute; width: 30px; right: 20px; top: 15px"
            />
            <ion-list style="position: relative; top: 8px">
              <ion-item>
                <ion-label style="margin-left: 30px">
                  <strong> Desde:</strong>
                  {{ var_computed_solicitud_usuario.s.inicio_ruta_address }}
                </ion-label>
                <img
                  src="/assets/icon/green-dot-pulse.gif"
                  style="position: absolute; width: 30px; top: 9px; left: 0px"
                />
              </ion-item>
              <ion-item>
                <ion-label style="margin-left: 33px">
                  <strong> Hasta:</strong>
                  {{
                    var_computed_solicitud_usuario.s.final_ruta_address
                  }}</ion-label
                >
                <img
                  src="/assets/icon/flag.png"
                  style="position: absolute; width: 20px; top: 15px; left: 5px"
                />
              </ion-item>
              <ion-item v-show="var_computed_solicitud_usuario.s.type_solicitud == 'envio_paquete'" >
                <ion-label style="margin-left: 33px">
                  <strong> Paquete:</strong>
                  {{
                    var_computed_solicitud_usuario.s.descripcion
                  }}</ion-label
                >
                <img
                  src="/assets/icon/cardboard-box.png"
                  style="position: absolute; width: 20px; top: 15px; left: 5px"
                />
              </ion-item>
            </ion-list>
            <ion-button
              color="danger"
              expand="block"
              @click="DeleteIfExistRequestUser"
            >
              <img
                src="https://img.icons8.com/color/18/000000/cancel--v1.png"
              />
              Cancelar Servicio
            </ion-button>
          </ion-card-header>
        </ion-card>
      </div>
      <div id="container" style="width: 100%; height: 100%; z-index: 1">
        <div id="map" class="map"></div>
        <div class="float-div-mapper">
          <ion-button  
            :disabled=" var_computed_solicitud_usuario != null && Object.entries(var_computed_solicitud_usuario).length > 0" 
            color="warning" @click="var_computed_modalAdondeQuieresIr = !var_computed_modalAdondeQuieresIr" 
            expand="block">
            ¿A donde quieres ir?
          </ion-button>
        </div>
      </div>
      <!-- modal seleccionar inicio/fin destino -->
      <ion-modal
        :is-open="var_computed_modalAdondeQuieresIr"
        :initial-breakpoint="1"
        :breakpoints="[1, 1, 1]"
        :backdrop-breakpoint="1"
      >
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click="var_computed_modalAdondeQuieresIr = !var_computed_modalAdondeQuieresIr">
                <img
                  src="https://img.icons8.com/ios/30/000000/circled-left.png"
                />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-buttons slot="end">
            <ion-button color="danger"
              ><img
                src="https://img.icons8.com/ios/30/000000/circled-left.png"
              />
            </ion-button>
          </ion-buttons>
          <ion-searchbar
            placeholder="Ingrese punto de partida"
            search-icon="map"
            @ionChange="geocode"
            v-model="searchAddressPI.name"
          />
          <ion-searchbar
            placeholder="Ingresa el destino"
            search-icon="map"
            @ionChange="geocode2"
            v-model="searchAddressPF.name"
          />
           <ion-item class="my-2" >
            <ion-label class="relative" >
             <strong> Metodo de pago </strong>
              <img class="float-right" v-if="var_computed_metodo_de_pago.tipo_metodo == 'efectivo'" src="https://img.icons8.com/dusk/25/000000/money--v1.png"  />
              <img class="float-right" v-if="var_computed_metodo_de_pago.tipo_metodo == 'tarjeta'" src="https://img.icons8.com/color/25/000000/mastercard-credit-card.png"  />
            </ion-label>
            <ion-select
              interface="popover"
              placeholder="Selecione"
              v-model="var_computed_metodo_de_pago.tipo_metodo"
            >
              <IonSelectOption value="efectivo">Pago con efectivo</IonSelectOption>
              <IonSelectOption value="tarjeta">Pago con tarjeta</IonSelectOption>
            </ion-select>
          </ion-item>

          <div class="flex justify-center" v-if="var_computed_metodo_de_pago.tipo_metodo == 'tarjeta'" >
            <ul class="bg-white  border border-gray-200 w-full text-gray-900 my-5 mx-0 ">
              <li class="px-6 py-2 border-b border-t-0 border-l-0 border-gray-200 w-full  relative">
                <div class="flex space-x-2 justify-right">
                    <button type="button" class=" rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 mx-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                </div>
                <p class="absolute top-3 left-20 " >Agregar tarjeta</p>
              </li>
              <!-- <li class="px-6 py-2 border-b border-gray-200 w-full">
                <div class="form-check ml-3">
                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                    Default checkbox
                  </label>
                </div>
              </li>
              <li class="px-6 py-2 border-b border-gray-200 w-full">
                <div class="form-check ml-3">
                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                    Default checkbox
                  </label>
                </div>
              </li>
              <li class="px-6 py-2 border-b border-gray-200 w-full">
                <div class="form-check ml-3">
                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                    Default checkbox
                  </label>
                </div>
              </li> -->
            </ul>
          </div>

          <!-- credit card from -->
          <!-- <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
                <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png">
                <div class="w-full px-8 absolute top-8">
                    <div class="flex justify-between">
                        <div class="">
                            <p class="font-light">
                                Name
                            </p>
                            <p class="font-medium tracking-widest">
                                Karthik P
                            </p>
                        </div>
                    </div>
                    <div class="pt-1">
                        <p class="font-light">
                            Card Number
                        </p>
                        <p class="font-medium tracking-more-wider">
                            4642  3489  9867  7632
                        </p>
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">
                            <div class="">
                                <p class="font-light text-xs">
                                    Valid
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    11/15
                                </p>
                            </div>
                            <div class="">
                                <p class="font-light text-xs text-xs">
                                    Expiry
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    03/25
                                </p>
                            </div>
    
                            <div class="">
                                <p class="font-light text-xs">
                                    CVV
                                </p>
                                <p class="font-bold tracking-more-wider text-sm">
                                    ···
                                </p>
                            </div>
                        </div>
                    </div>
    
                </div>
          </div> -->
          <!-- end credit card from -->
          <button
            type="button"
            @click="ConfirmarRuta"
            class="w-full text-3xl mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            CONFIRMAR
          </button>
          <ion-progress-bar type="indeterminate" v-show="isLoadingProgresBar" />
          <ion-content
            class="ion-padding"
            v-if="AddressListOrigin"
            v-show="AddressListDestiny.length <= 0"
          >
            <ion-label> Origenes: </ion-label>
            <ion-list>
              <ion-item>
                <ion-label
                  >Resultados {{ AddressListOrigin.length }} de
                  {{ AddressListOrigin.length }}</ion-label
                >
              </ion-item>
              <ion-item
                v-for="(addressOrigin, ao) in AddressListOrigin"
                :key="ao"
                @click="selectedPointStarted(addressOrigin)"
              >
                <img
                  src="https://img.icons8.com/material-outlined/34/000000/marker-a.png"
                  class="mr-2"
                />
                <ion-label class="ml-2">
                  {{ addressOrigin.name }} <br />
                  <small class="text-[#cecece] text-sm">{{
                    addressOrigin.shortName
                  }}</small>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
          <ion-content
            class="ion-padding"
            v-if="AddressListDestiny"
            v-show="AddressListOrigin.length <= 0"
          >
            <ion-label> Destinos: </ion-label>
            <ion-list>
              <ion-item>
                <ion-label
                  >Resultados {{ AddressListDestiny.length }} de
                  {{ AddressListDestiny.length }}</ion-label
                >
              </ion-item>
              <ion-item
                v-for="(addressDestiny, ad) in AddressListDestiny"
                :key="ad"
                @click="selectedPointEnd(addressDestiny)"
              >
                <img
                  src="https://img.icons8.com/material-outlined/34/000000/marker-b.png"
                  class="mr-2"
                />
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
      <!-- modal Seleccionar tipo de servicio -->
      <ion-modal
        :is-open="var_computed_SeleccionarTipoDeViaje"
        :initial-breakpoint="0.75"
        :breakpoints="[0.85, 0.8, 0.85]"
        :backdrop-breakpoint="0.8"
      >
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click="var_computed_SeleccionarTipoDeViaje = !var_computed_SeleccionarTipoDeViaje">
                <img
                  src="https://img.icons8.com/ios/30/000000/circled-left.png"
                />
              </ion-button>
            </ion-buttons>
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
                            @click="ServicioEnvioDePaquete('envio_paquete')">
                            <p>Solicitar</p>
                            <p> ${{ Intl.NumberFormat(['ban', 'id']).format(requestServices.costo_servicio) }}</p>
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
      </ion-modal>
      <!-- modal Envio de paquetes -->
      <ion-modal
        :is-open="var_computed_EnvioDePaquetes"
        :initial-breakpoint="0.75"
        :breakpoints="[0.75, 0.7, 0.75]"
        :backdrop-breakpoint="0.7"
      >
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="end">
              <ion-button @click="var_computed_EnvioDePaquetes = !var_computed_EnvioDePaquetes">
                <img
                  src="https://img.icons8.com/ios/30/000000/circled-left.png"
                />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="h-screen">
            <ion-header collapse="condense">
                  <ion-toolbar>
                    <ion-buttons slot="end">
                        <ion-button color="danger"><img src="https://img.icons8.com/ios/30/000000/circled-left.png" />
                        </ion-button>
                    </ion-buttons>
                    <ion-title class="text-2xl"> Envio de Paquetes </ion-title>
                  </ion-toolbar>
            </ion-header>
            <div class="m-4 max-h-fit max-w-full text-[#fff] p-2 shadow-[0_10px_10px_1px_rgba(0,0,0,0.3)] relative rounded-lg">
                <div class="grid grid-cols-12">
                    <div class="col-span-2">
                        <img
                            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png" />
                    </div>
                    <div class="col-span-10  mt-2 ml-2">
                        <div class=" text-center  uppercase text-[#000] text-3xl font-bold align-middle mb-5 ">
                            <p>Formulario</p>
                            <p class="text-lg">Costo Total: ${{ Intl.NumberFormat().format( costo_final_envio_de_paquetes) }}</p>
                        </div>
                        <div class=" text-left divide-y uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <ion-item>
                                <ion-label position="floating">Cantidad</ion-label>
                                <ion-input type="number" v-model="paquete.cantidad"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Alto(cm)</ion-label>
                                <ion-input type="number" v-model="paquete.alto"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Ancho(cm)</ion-label>
                                <ion-input type="number" v-model="paquete.ancho"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Largo(cm)</ion-label>
                                <ion-input type="number" v-model="paquete.largo"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Peso(g)</ion-label>
                                <ion-input type="number" v-model="paquete.peso"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Descripción</ion-label>
                                <ion-textarea v-model="paquete.descripcion"></ion-textarea>
                            </ion-item>
                        </div>
                    </div>
                    <div class="col-span-12  text-[#000] align-middle text-center self-center font-bold ml-2">
                        <button
                            class="mt-2 mb-2 w-full  bg-green-300 p-2 rounded-xl hover:bg-green-500  text-white font-semibold"
                            @click="ConfirmarEnvioDePaquete">
                            <p>Solicitar</p>
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>
<script lang="ts">
/* eslint-disable */
import { defineComponent, computed, onMounted, ref } from "vue";
import { informationCircle } from "ionicons/icons";
import { Storage } from "@capacitor/storage";
import { useStore } from "vuex";
import {
  IonListHeader,
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
  // IonSlides,
  // IonSlide,
  // IonRow,
  // IonCol,
  IonTextarea,
  IonInput
} from "@ionic/vue";

var EndFlag = require("../../public/assets/icon/flag.png");
var GreenkDotPulse = require("../../public/assets/icon/green-dot-pulse.gif");
const standingMan = require("../../public/assets/icon/standing-man.png");
import axios from 'axios'

export default defineComponent({
  name: "FolderPage",
  components: {
    IonListHeader,
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
    // IonSlides,
    // IonSlide,
    // IonRow,
    // IonCol,
    IonTextarea,
    IonInput,
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
    const requestServices: any = computed({
      get: () => {
        return store.getters.modelDataRequestServices;
      },
      set: (val: any) => {
        store.commit("setModelDataRequestServices", val);
      },
    });
    const var_computed_EnvioDePaquetes: any = computed({
      get: () => {
        return store.getters.openModalOpcionesDeViaje;
      },
      set: (val: any) => {
        store.commit("setOpenModalOpcionesDeViaje", val);
      },
    });
    const var_computed_modalAdondeQuieresIr: any = computed({
      get: () => {
        return store.getters.modal_a_donde_quieres_ir;
      },
      set: (val: any) => {
        store.commit("setModalADondeQuieresIr", val);
      },
    });
    const var_computed_SeleccionarTipoDeViaje: any = computed({
      get: () => {
        return store.getters.modal_a_seleccionar_tipo_de_viaje;
      },
      set: (val: any) => {
        store.commit("setModalSeleccionarTipoDeViaje", val);
      },
    });
    const var_computed_metodo_de_pago: any = computed({
      get: () => {
        return store.getters.metodo_de_pago;
      },
      set: (val: any) => {
        store.commit("setMetodoDePago", val);
      },
    });
    const User: any = computed({
            get: () => { return store.getters.user },
            set: (val: any) => { store.commit('setUser', val) }
        });
    const customPopoverOptions = {
      header: "Metodo de pago",
      subHeader: "",
      message: "",
    };
    const slideOpts = {
      initialSlide: 1,
      speed: 400,
    };
    const paquete: any = ref({
          cantidad: 0,
          alto: 0,
          ancho: 0,
          largo: 0,
          peso: 0,
          descripcion: ''
      })
    const costo_final_envio_de_paquetes: any = computed({
          get: () => {
              var costo: any = parseInt(requestServices.value.costo_servicio);
              var cal = parseInt((costo + (
                  paquete.value.cantidad *
                  (parseInt(paquete.value.alto) + parseInt(paquete.value.ancho) + parseInt(paquete.value.largo) + parseInt(paquete.value.peso))
              )
              ))
              return cal;
          },
          set: (val: any) => {
              requestServices.value.costo = val
          }
    });

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
        const directionsRenderer = new google.value.maps.DirectionsRenderer({ suppressMarkers: true});
        directionsRenderer.setMap(map.value);

        const response = await directionsService.route({
          origin: { query: searchAddressPI.value.name },
          destination: { query: searchAddressPF.value.name },
          travelMode: google.value.maps.TravelMode.DRIVING,
        });

        const start = {
          url: GreenkDotPulse,
          size: new google.value.maps.Size(50, 50),
          origin: new google.value.maps.Point(0, 0),
          anchor: new google.value.maps.Point(20, 20),
        };

        const end = {
          url: EndFlag,
          size: new google.value.maps.Size(50, 50),
          origin: new google.value.maps.Point(0, 0),
          anchor: new google.value.maps.Point(5, 42),
        };

        await directionsRenderer.setDirections(response);
        new google.value.maps.Marker({ position: response.routes[0].overview_path[0].toJSON(), map: map.value, icon: start});
        new google.value.maps.Marker({ position: response.routes[0].overview_path[response.routes[0].overview_path.length - 1].toJSON(), map: map.value, icon: end});
        await SeleccionarTipoDeServicio(response);
      } catch (error) {
        openToast(error);
        console.log(error);
      }
    };
    const SeleccionarTipoDeServicio: any = (data?: any) => {
      try {
        requestServices.value.distancia = data.routes[0].legs[0].distance;
        requestServices.value.tiempo = data.routes[0].legs[0].duration;
        requestServices.value.inicio.direccion = data.routes[0].legs[0].start_address;
        requestServices.value.inicio.LtnLng = data.routes[0].legs[0].start_location.toJSON();
        requestServices.value.final.direccion = data.routes[0].legs[0].end_address;
        requestServices.value.final.LtnLng = data.routes[0].legs[0].end_location.toJSON();
        requestServices.value.costo_servicio = (data.routes[0].legs[0].distance.value * 1000) / 1000;

        OpenModalOpcionesDeViaje();
      } catch (e) {
        // statements
        console.log(e);
      }
    };
    const OpenModalOpcionesDeViaje = async () => {
      var_computed_SeleccionarTipoDeViaje.value = true;
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
      var_computed_solicitud_usuario.value = JSON.parse(StoreRequest.value);
    };
    const DeleteIfExistRequestUser: any = async () => {
      const GetStoreRequest: any = await Storage.get({ key: "drive-user" });
      var parseStore = JSON.parse(GetStoreRequest.value);
      const GetUserlogin: any = await Storage.get({ key: "user_login" });
      var parseUserLogin = JSON.parse(GetUserlogin.value);
      var model = {
        estado: 'Servicio Cancelado',
        user_id: parseUserLogin.user.id
      }
      let { data }: any = await axios.post(`http://192.168.1.6:8000/api/cancel-servicio/${parseStore.s.id}`, model )
      await Storage.remove({ key: "drive-user" });
      initMap()
    }

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
                // // ServicioSolicitado.value.mensajes = [],
                ServicioSolicitado.value.estado = "solicitando servicio"; // solicitando servicio || servicio aceptado  || servicio iniciado || servicio finalizado 
                ServicioSolicitado.value.user_id = User.value.id
                
                    let { data }: any = await axios.post('http://192.168.1.6:8000/api/store-servicio', { ...ServicioSolicitado.value })
                      await Storage.set({
                        key: 'drive-user',
                          value: JSON.stringify({ estado: ServicioSolicitado.value.estado, id: data.id, s: data }),
                      });

                    var_computed_SeleccionarTipoDeViaje.value = false
                    var_computed_modalAdondeQuieresIr.value = false
                    ServicioSolicitado.value  = {
                      type_solicitud: '', // taxi || envio de paquetes
                      inicio_ruta_coords: [],
                      final_ruta_coords: [],
                      inicio_ruta_address: '',
                      final_ruta_address: '',
                      distancia_servicio: null ,// en kilometros/metros
                      tiempo_aproximado_de_viaje: null ,// minutos
                      costo: 0,
                      estado: null, // solicitando servicio || servicio aceptado  || servicio iniciado || servicio finalizado 
                      // meta_data: null, // los datos que se generan cuando se consulta la api de google
                      paquete: { // en tal caso que sea el servicio de tipo envio de paquetes
                          alto: null,
                          largo: null,
                          ancho: null,
                          peso: null,
                          descripcion: null,
                          cantidad: 0,
                      },
                      mensajes:[],
                    }
            } catch (e: any)  {
                const toast = await toastController.create({
                    header: "¡Error!",
                    message: e,
                    position: "top",
                    duration: 2000,
                    color: "danger",
                    icon: 'alert-circle-outline'
                });
                await toast.present();
            }
    }

    const ServicioEnvioDePaquete: any = async (req?: any) => {
      var_computed_SeleccionarTipoDeViaje.value = false
      var_computed_EnvioDePaquetes.value = true;
    }
    const ConfirmarEnvioDePaquete: any = async ()  => {
        try {
            ServicioSolicitado.value.type_solicitud = 'envio_paquete', // taxi || envio de paquetes
            ServicioSolicitado.value.inicio_ruta_coords = requestServices.value.inicio.LtnLng,
            ServicioSolicitado.value.final_ruta_coords = requestServices.value.final.LtnLng,
            ServicioSolicitado.value.inicio_ruta_address = requestServices.value.inicio.direccion,
            ServicioSolicitado.value.final_ruta_address = requestServices.value.final.direccion,
            ServicioSolicitado.value.distancia_servicio = requestServices.value.distancia,// en kilometros/metros
            ServicioSolicitado.value.tiempo_aproximado_de_viaje = requestServices.value.tiempo,// minutos
            ServicioSolicitado.value.costo = requestServices.value.costo_servicio,
            ServicioSolicitado.value.estado = "solicitando servicio"; // solicitando servicio || servicio aceptado  || servicio iniciado || servicio finalizado 
            ServicioSolicitado.value.user_id = User.value.id
            ServicioSolicitado.value.paquete.alto = paquete.value.alto,
            ServicioSolicitado.value.paquete.largo = paquete.value.largo,
            ServicioSolicitado.value.paquete.ancho = paquete.value.ancho,
            ServicioSolicitado.value.paquete.peso = paquete.value.peso,
            ServicioSolicitado.value.paquete.descripcion = paquete.value.descripcion
            ServicioSolicitado.value.paquete.cantidad = paquete.value.cantidad

           let { data } = await axios.post('http://192.168.1.6:8000/api/store-servicio', { ...ServicioSolicitado.value })

            await Storage.set({ key: 'drive-user', value: JSON.stringify({ estado: ServicioSolicitado.value.estado, id: data.id, s: data })});

            var_computed_SeleccionarTipoDeViaje.value = false
            var_computed_modalAdondeQuieresIr.value = false
            var_computed_EnvioDePaquetes.value = false;
            ServicioSolicitado.value  = {
              type_solicitud: '', // taxi || envio de paquetes
              inicio_ruta_coords: [],
              final_ruta_coords: [],
              inicio_ruta_address: '',
              final_ruta_address: '',
              distancia_servicio: null ,// en kilometros/metros
              tiempo_aproximado_de_viaje: null ,// minutos
              costo: 0,
              estado: null, // solicitando servicio || servicio aceptado  || servicio iniciado || servicio finalizado 
              // meta_data: null, // los datos que se generan cuando se consulta la api de google
              paquete: { // en tal caso que sea el servicio de tipo envio de paquetes
                  alto: null,
                  largo: null,
                  ancho: null,
                  peso: null,
                  descripcion: null,
                  cantidad: 0,
              },
              mensajes:[],
            }

        } catch (e: any) {
          const toast = await toastController.create({
              header: "¡Error!",
              message: e,
              position: "top",
              duration: 2000,
              color: "danger",
              icon: 'alert-circle-outline'
          });
          await toast.present();
        }
          
    }

    const myPromise = new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(getIfExistRequestUser());
      }, 300);
    });

    onMounted(() => {
      initMap();
      myPromise;
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
      slideOpts,
      DeleteIfExistRequestUser,
      var_computed_modalAdondeQuieresIr,
      var_computed_SeleccionarTipoDeViaje,
      servicioSelected,
      requestServices,
      var_computed_metodo_de_pago,
      paquete,
      var_computed_EnvioDePaquetes,
      costo_final_envio_de_paquetes,
      ServicioEnvioDePaquete,
      ConfirmarEnvioDePaquete
    };
  },
  methods: {
    setOpen(isOpen: boolean) {
      this.isOpen = false;
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
