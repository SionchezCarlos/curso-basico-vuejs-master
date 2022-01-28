//Los padres se comunican con los hijos atraves de propiedades.
//Los hijos se comunican con los padres atraves de eventos.

Vue.component('CoinDetail', {
  props:['coin'], //definomos las propiedades heredadas del componente padre.

  data(){
    return {
      showPrices: false,
      value: 0
    }
  },

  created(){
    //Este es uno de los primeros hook que se ejecutan y es el indicado para cargar a los componentes de contenido dinamico que venga desde una api o desde un servidor.
    console.log('Created CoinDitail')
  },

  mounted(){
    //En este momento ya se encuentra disponible el DOM asi que puedo dispones de sus elementos.
    console.log('Mounted CoinDitail')
  },

  methods:{
    toggleShowPrices(){
      this.showPrices = ! this.showPrices
    
      this.$emit('change-color', this.showPrices?'FF96C8':'3D3D3D') //$emit funcion dentro del core de vue he indica que el componente emite un evento lalamado change-color, puedo enviarle un parametro atarves de su sengundo argumento.
    },
  },

  computed:{ //Definimos las propiedades computadas que son funciones que siempre regresan un valor.
    title(){
      return `${this.coin.name} - ${this.coin.symbol}`
    },

    convertedValue(){
      if(!this.value){
        return 0
      }

      return this.value / this.coin.price
    }
  },

  template: `
  <div>
    <img 
      v-on:mouseover="toggleShowPrices" 
      v-on:mouseout="toggleShowPrices" 
      v-bind:src="coin.img" 
      v-bind:alt="coin.name"
    >

    <h1 v-bind:class="coin.changePercent > 0 ? 'green' : 'red'"> 
      {{ title }}

      <span v-if="coin.changePercent > 0">👍</span>
      <span v-else-if="coin.changePercent < 0">👎</span>
      <span v-else>🤞</span>
  
      <span v-on:click="toggleShowPrices">
        {{ showPrices ? '🙈' : '🐵' }}
      </span>
    </h1>

    <input type="number" v-model="value">
    <span>{{ convertedValue }}</span>

    <slot name="text"></slot>
    <slot name="link"></slot>

    <ul v-show="showPrices">
      <li
        class = "uppercase"
        v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value > coin.price}" 
        v-for="(p, i) in coin.pricesWithDays" 
        v-bind:key="p.day">
        {{i}} - {{p.day}} - {{p.value}}</li>
    </ul>
  </div>
  `
})

new Vue({ //Esta instancia viene siendo el componente padre.
  el: '#app',
  data (){
    return {
      btc: {
        name: 'Bitcoin',
        symbol: 'BTC',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 10,
        prices: [8400, 7900, 8200, 9000, 9400, 10000, 10200],
        price: 8400,
        pricesWithDays: [
          {day: 'Lunes', value: 8400},
          {day: 'Martes', value: 7900},
          {day: 'Miercoles', value: 8200},
          {day: 'Jueves', value: 9000},
          {day: 'Viernes', value: 9400},
          {day: 'Sabado', value: 10000},
          {day: 'Domingo', value: 10200}
        ],
      },
      color: 'f4f4f4'
    }
  },

  // watch:{ //Funciones que ejecutan fragmentos de codigo, el nombre tiene quew corresponder con el de una propiedad. 
  //   showPrices(newVal, oldVal){ //de esta forma esta funcion se ejecutara cada vez que la propiedad showPrices cambie su valor.
  //     console.log(newVal, oldVal)
  //   }
  // },

  created(){
    //Este es uno de los primeros hook que se ejecutan y es el indicado para cargar a los componentes de contenido dinamico que venga desde una api o desde un servidor.
    console.log('Created')
  },

  mounted(){
    //En este momento ya se encuentra disponible el DOM asi que puedo dispones de sus elementos.
    console.log('Mounted')
  },

  methods:{
    UpdateColor(color){
      this.color = color || this.color.split('').reverse().join('') //Combierte el string en un array invierte el orden y luego lo combierte en un string.
    }
  }
})

//Slot: son funcionalidades que permiten que el componente padre inyecte codigo html a un componente hijo.

//Hook: son eventos que pueeden disparas funciones dependiendo de la etapa donde se encuentre el componente en su ciclo de vida.