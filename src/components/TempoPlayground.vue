<script setup lang="ts">
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import Bar from './Bar.vue'
import { state } from '../globals';
import { cloneDeep } from 'lodash';
import { sounds, svgs } from '../constants';
import trashCan from '../assets/trash-can.svg'
import { Rhythm } from '../types';
import { dragToLengthCheck } from '../utils';
import playSvg from '../assets/play.svg'

const candidates = ref<Rhythm[]>([
  {
    beats: [
      { length: 1 / 4, sound: 'piano' },
    ],
    svg: 'quarter-note'
  },
  {
    beats: [
      { length: 1 / 4, sound: 'rest' },
    ],
    svg: 'quarter-rest'
  },
  {
    beats: [
      { length: 1 / 8, sound: 'piano' },
      { length: 1 / 8, sound: 'piano' },
    ],
    svg: 'double-eighth-note'
  },
  {
    beats: [
      { length: 1 / 2, sound: 'piano' },
    ],
    svg: 'half-note'
  },
  {
    beats: [
      { length: 1 / 2 + 1 / 4, sound: 'piano' },
    ],
    svg: 'dotted-half-note'
  },
  {
    beats: [
      { length: 1, sound: 'piano' }
    ],
    svg: 'whole-note'
  },
]);

const prepareRhythms = [
  {
    beats: [
      { length: 1 / 4, sound: 'castanets' },
      { length: 1 / 4, sound: 'castanets' },
      { length: 1 / 4, sound: 'castanets' },
      { length: 1 / 4, sound: 'castanets' },
    ],
    svg: ''
  }
];

const handleMove = (e) => dragToLengthCheck(e);

const trash = ref([]);
watch(trash, () => {
  if (trash.value.length !== 0) {
    trash.value = [];
  }
});

let playing = false;
const timeoutIds = [] as number[];
const playTempo = () => {
  let playingAudio = undefined as HTMLAudioElement | undefined;
  if (playing) {
    timeoutIds.forEach((id) => clearTimeout(id));
    playingAudio?.pause();
    playing = false;
    return;
  }
  const playingBars = [
    prepareRhythms,
    ...bars.value,
  ]
  playingBars.forEach((bar, index) => {
    let current = index * (60 / state.bpm) * state.barLength;
    bar.forEach((rhythm) =>
      rhythm.beats.forEach((beat) => {
        const beatTime = (60 / state.bpm) * (beat.length * state.baseBeat);
        if (beat.sound === 'rest') {
          timeoutIds.push(
            setTimeout(() => {
              playingAudio?.pause();
            }, current * 1000)
          );
        } else {
          timeoutIds.push(
            setTimeout(() => {
              sounds[beat.sound].currentTime = 0;
              sounds[beat.sound].play()
              playingAudio = sounds[beat.sound];
            }, current * 1000)
          );
          timeoutIds.push(
            setTimeout(() => {
              playingAudio?.pause();
            }, (current + beatTime) * 1000 - 1)
          );
        }
        current += beatTime;
      }));
  });
}
const bars = ref([[], []] as Rhythm[][]);
</script>

<template>
  <div style="width: 800px; margin: 2em auto; ">
    <div style="display: flex; align-items: center; flex-direction: column; gap: 2em">
      <draggable style="display: flex; flex-direction: row; gap: 1em; justify-content: center;" v-model="candidates"
        :group="{ name: 'beats', pull: 'clone', put: false }"
        :clone="(e) => { state.draggingRhythm = e; return cloneDeep(e); }" ghost-class="ghost" :move="handleMove"
        item-key="id">
        <template #item="{ index, element }">
          <div :key="index" style="width: 96px">
            <img :src="svgs[element.svg]" />
          </div>
        </template>
      </draggable>

      <div style="display: flex; flex-direction: row; margin-top: 2em">
        <div class="signature">
          <div style="height: 0.8em;">4</div>
          <div>4</div>
        </div>
        <bar v-model="bars[0]" style="margin: 0 1em" />
        <div style="width: 4px; height: 6em; background-color: #000;"></div>
        <bar v-model="bars[1]" style="margin: 0 1em" />
        <div style="width: 4px; height: 6em; background-color: #000;"></div>
        <div style="margin-left: 4px; width: 12px; height: 6em; background-color: #000;"></div>
      </div>
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
