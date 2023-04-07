<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import Bar from './Bar.vue'
import { state } from '../globals';
import { beats, sounds } from '../constants';
import trashCan from '../assets/trash-can.svg'
import { Rhythm } from '../types';
import playSvg from '../assets/play.svg'
import RhythmList from './RhythmList.vue';
import Sheet from './Sheet.vue';

const trash = ref([]);
watch(trash, () => {
  if (trash.value.length !== 0) {
    trash.value = [];
  }
});

const prepareRhythms = [
  {
    beats: [
      beats.quarterCastanets,
      beats.quarterCastanets,
      beats.quarterCastanets,
      beats.quarterCastanets,
    ],
    svg: ''
  }
];
let playing = false;
const timeoutIds = [] as number[];
const playTempo = () => {
  if (playing) {
    timeoutIds.forEach((id) => clearTimeout(id));
    playing = false;
    return;
  }
  playing = true;
  const playingBars = [
    prepareRhythms,
    ...bars.value,
  ]
  playingBars.forEach((bar, index) => {
    let current = index * (60 / state.bpm) * state.barLength;
    bar.forEach((rhythm) =>
      rhythm.beats.forEach((beat) => {
        const beatTime = (60 / state.bpm) * (beat.length * state.baseBeat);
        if (beat.sound !== 'rest') {
          timeoutIds.push(
            setTimeout(() => {
              sounds[beat.sound].play()
            }, current * 1000)
          );
          timeoutIds.push(
            setTimeout(() => {
              sounds[beat.sound].stop();
            }, (current + beatTime) * 1000 - 1)
          );
        }
        current += beatTime;
      }));
  });
  setTimeout(() => {
    playing = false;
  }, playingBars.length * (60 / state.bpm) * state.barLength * 1000);
}
const bars = ref([[], []] as Rhythm[][]);
</script>

<template>
  <div style="width: 800px; margin: 2em auto; ">
    <div style="display: flex; align-items: center; flex-direction: column; gap: 2em">
      <RhythmList />

      <Sheet v-model="bars" />
      <div style="width: 100%">
        <div style="margin-left:46em">
          <button style="height: 4em; width: 7em;" @click="playTempo"><img style="width: 3em; height: 100%;"
              :src="playSvg" /></button>
        </div>
      </div>

      <div style="margin-top: 3em; display: flex; align-items: center; flex-direction: column;">
        <div>
          <draggable style="height: 128px;" v-model="trash" :group="{ name: 'beats', pull: false, put: () => true }"
            ghost-class="trash-ghost" item-key="id">
            <template #item="{ index, element }">
              <div :key="index">
                <div></div>
              </div>
            </template>
          </draggable>
          <div
            style="margin-top: -128px; display: flex; flex-direction: row; width: 96px; height: 96px; justify-content: center;">
            <img :src="trashCan" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.signature {
  font-size: 4.5em;
  margin-top: -32px;
}

.ghost {
  opacity: 0.5;
}

.trash-ghost {
  display: none;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
</style>
