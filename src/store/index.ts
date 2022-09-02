import { createStore } from 'vuex'
import { Loader } from "@googlemaps/js-api-loader"
import { modalController } from '@ionic/vue';
import Modal from '../componentes/modalBuscarDestino.vue'
import ModalOpcionesDeviaje from '../componentes/modalOpcionesDeViajes.vue'
import ModalEnvioDePaquetes from '../componentes/modalEnvioDePaquetes.vue'
 
export default createStore({
    state: {
        marker: [],
        Map: [],
        loader: new Loader({
            apiKey: "AIzaSyDjc7g2sDf0u4tc_JiUzA1brt0V3PcDSrk",
            version: "weekly",
        }),
        markertInitPosition: {},
        markertFinalPosition: {},
        searchAddressPI: {
            name: '',
            coords: null
        },
        searchAddressPF: {
            name: '',
            coords: null
        },
        openModal: async () => {
            
             const modal = await modalController
                .create({
                    component: Modal,
                    initialBreakpoint: 0.7,
                    breakpoints: [0, 0.5, 1]
                })
            return modal.present();
        },
        openModalOpcionesDeViaje: async () => {
            
             const modal = await modalController
                .create({
                    component: ModalOpcionesDeviaje,
                    initialBreakpoint: 0.5,
                    breakpoints: [0, 0.5, 1]
                })
            return modal.present();
        },
        openModalEnvioDePaquetes: async () => {
            
             const modal = await modalController
                .create({
                    component: ModalEnvioDePaquetes,
                    initialBreakpoint: 0.9,
                    breakpoints: [0, 0.5, 1]
                })
            return modal.present();
        },
        modelDataRequestServices:{
            tipo_de_servicio: '',
            inicio: {
                direccion: '',
                LtnLng: null
            },
            final: {
                direccion: '',
                LtnLng: null,
            },
            tiempo: null,
            distancia: null,
            costo_km: parseFloat("1000"),
            costo_servicio: 0,
            usuario: null
        },
        google: {},
        solicitud_user: {
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
        },
        mis_viajes: [],
        user: {},
        solicitud_Usuario:{},
    },
    getters: {
        modelDataRequestServices: state => state.modelDataRequestServices,
        marker: state => state.marker,
        Map: state => state.Map,
        loader: state => state.loader,
        markertInitPosition: state => state.markertInitPosition,
        markertFinalPosition: state => state.markertFinalPosition,
        searchAddressPI: state => state.searchAddressPI,
        searchAddressPF: state => state.searchAddressPF,
        openModal: state  => state.openModal,
        openModalOpcionesDeViaje: state => state.openModalOpcionesDeViaje,
        openModalEnvioDePaquetes: state => state.openModalEnvioDePaquetes,
        google: state  => state.google,
        solicitud_user: state => state.solicitud_user,
        mis_viajes: state => state.mis_viajes,
        user: state => state.user,
        solicitud_Usuario: state => state.solicitud_Usuario,

    },
    mutations: {
        setSolicitudUsuario(state, data){
            state.solicitud_Usuario = data
        },
        setUser(state, data){
            state.user = data
        },
        setMisViajes(state, data){
            state.mis_viajes = data
        },
        setSolicitudUser(state,data){
            state.solicitud_user = data
        },
        setGoogle(state, data){
            state.google = data
        },
        setModelDataRequestServices(state, data){
            state.modelDataRequestServices = data
        },
        setopenModalEnvioDePaquetes(state, data){
          state.openModalEnvioDePaquetes = data
        },
        setOpenModalOpcionesDeViaje(state, data){
          state.openModalOpcionesDeViaje = data
        },
        setOpenModal(state, data){
          state.openModal = data
        },
        setsearchAddressPI(state, data){
          state.searchAddressPI = data
        },
        setsearchAddressPF(state, data){
          state.searchAddressPF = data
        },
        setMarkerInitPosition(state, data){
          state.markertInitPosition = data
        },
        setMarkerFinalPosition(state, data){
          state.markertFinalPosition = data
        },
        setLoader(state, data) {
            state.loader = data
        },
        setMarker(state, data) {
            state.marker = data
        },
        setMap(state, data) {
            state.Map = data
        }

    },
})