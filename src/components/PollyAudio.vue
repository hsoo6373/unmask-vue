<template>
    <div></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PollyAudio',
  data: function() {
    return {
      audiosPlaying: 0,
      maxAudioPlaying: 3,
      reverbIndex: 0,
      audioContext: undefined,
      reverbSamples: [ 
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb.wav',
        'https://hrithviksood.s3-ap-southeast-2.amazonaws.com/unmask/audio/ReverbSample/customReverb2.wav',
      ],
      quadrant: {
        FIRST: {
          xPos: Math.floor(Math.random() * 11) * 100,
          yPos: Math.floor(Math.random() * 11) * 100,
          zPos: Math.floor(Math.random() * 11) * 100,
        },
        SECOND: {
          xPos: Math.floor(Math.random() * 11) * -100,
          yPos: Math.floor(Math.random() * 11) * -100,
          zPos: Math.floor(Math.random() * 11) * 100,
        },
        THIRD: {
          xPos: Math.floor(Math.random() * 11) * -100,
          yPos: Math.floor(Math.random() * 11) * 100,
          zPos: Math.floor(Math.random() * 11) * -100,
        },
        FOURTH: {
          xPos: Math.floor(Math.random() * 11) * 100,
          yPos: Math.floor(Math.random() * 11) * -100,
          zPos: Math.floor(Math.random() * 11) * -100,
        }
      },
      quadrantIndex: 0,
    };
  },
  mounted: function() {
    this.setup()
    this.playAudio();
  },
  methods: {
    setup: function() {
      this.audioContext = this.createAudioCtx();
      this.createListener();
    },
    createListener: function() {
      const listener = this.audioContext.listener;
      const posX = 0;
      const posY = 0;
      const posZ = 0;
      listener.setPosition(posX, posY, posZ);
      
      listener.forwardX.value = 0;
      listener.forwardY.value = 0;
      listener.forwardZ.value = 1;
      listener.upX.value = 0;
      listener.upY.value = -1;
      listener.upZ.value = 0;
    },
    createAudioCtx: function() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      return new AudioContext();
    },
    playAudio: function() {
      const sourceUrl = this.$store.getters.getRandomRecording
      const sourceNode = this.audioContext.createBufferSource();
      this.setupAudio(sourceUrl, sourceNode).then(sourceNode.connect(this.getGain(2)))
      sourceNode.start(0);
    },
    getGain: function(volume) {
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(this.getReverb());
      return gainNode;
    },
    getReverb: function() {
      const index = Math.floor(Math.random() * this.sampleSize);
      var reverbUrl = this.reverbSamples[index];
      const reverbNode = this.audioContext.createConvolver();
      
      reverbUrl = 'http://reverbjs.org/Library/EmptyApartmentBedroom.m4a';
      
      this.setupAudio(reverbUrl, reverbNode).then(reverbNode.connect(this.getPanner()));
      return reverbNode;
    },
    getPanner: function() {
      var panner = this.audioContext.createPanner();
    
      panner.panningModel = 'HRTF';
      panner.distanceModel = 'linear';
      
      const currentQuad = this.currentQuadrant;
      let xPos = currentQuad.xPos;
      let yPos = currentQuad.yPos;
      let zPos = currentQuad.zPos;
      
      this.quadrantIndex = this.quadrantIndex >= 3 ? 0 : ++this.quadrantIndex;
      
      console.log(xPos, yPos, zPos, this.quadrantIndex);
      panner.setPosition(xPos, yPos, zPos);
      panner.connect(this.audioContext.destination);
      return panner;
    },
    setupAudio: async function(url, node) {
      axios.get(url, { responseType: 'arraybuffer' }).then(response => {
        this.audioContext.decodeAudioData(response.data, audioBuffer => {
          node.buffer = audioBuffer;
        })
      });
    }
  },
  computed: {
    sampleSize: function() {
      return this.reverbSamples.length;
    },
    currentQuadrant: function() {
      const quads = ['FIRST', 'SECOND', 'THIRD', 'FOURTH'];
      return this.quadrant[quads[this.quadrantIndex]];
    },
  }
}
</script>