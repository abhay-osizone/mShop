import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '@/plugins/firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {},
    state:{
        products: [],
        blogs: [],
        category: [],
        coupons: [],
        alerts: {
          text: '',
          color: 'success',
          snackbar: false,
          timeout: 9000.
        },
    },
    mutations: {
      // Mutation for realtime firestore database.
      ...vuexfireMutations,

      // Mutation for snackbar alert.
      triggerAlert (state, payload) {
        state.alerts.text = payload.text,
        state.alerts.color = payload.color,
        state.alerts.snackbar = true;
        setTimeout(()=>{
          state.alerts.snackbar = false;
        }, 3000)
      }
    },
    actions: {
      bindProducts: firestoreAction(({ bindFirestoreRef }) => {
        return bindFirestoreRef('products', db.collection('mProduct'))
      }),
      bindBlogs: firestoreAction(({ bindFirestoreRef }) => {
        return bindFirestoreRef('blogs', db.collection('Blogs'))
      }),
      bindCategory: firestoreAction(({ bindFirestoreRef }) => {
        return bindFirestoreRef('category', db.collection('Category'))
      }),
      bindCoupons: firestoreAction(({ bindFirestoreRef }) => {
        return bindFirestoreRef('coupons', db.collection('Coupons'))
      }),
    }
})