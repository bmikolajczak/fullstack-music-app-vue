<template>
   <div class="border border-gray-200 p-3 mb-4 rounded">
              <div v-show="!showForm">
                <h4 class="inline-block text-2xl font-bold">{{song.modified_name}}</h4>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
                @click.prevent="deleteSong">
                  <i class="fa fa-times"></i>
                </button>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                @click.prevent="showForm=!showForm">
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
              <div v-show="showForm">
                  <div class="text-white text-center font-bold p-4 mb-4"
                  v-show="show_alert" :class="alert_variant">
                    {{alert_message}}
                  </div>
                <vee-form
                :validation-schema="valiSchema"
                :initial-values="song"
                @submit='edit'>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <vee-field type="text" name="title"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Song Title"
                      @input="updateUnsavedFlag(true)"/>
                      <ErrorMessage class='text-red-400' name="title"/>
                  </div>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Genre"
                      @input="updateUnsavedFlag(true)"/>
                      <ErrorMessage class='text-red-400' name="genre"/>
                  </div>
                  <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
                  :disabled="in_submission">
                    Submit
                  </button>
                  <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600"
                  :disabled="in_submission" @click.prevent="showForm=!showForm">
                    Go Back
                  </button>
                </vee-form>
              </div>
            </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      valiSchema: {
        title: 'required|min:5|max:50|alpha_spaces',
        genre: 'min:3|max:15|alpha_spaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Updating song info...',
    };
  },
  methods: {
    async edit(values) {
      console.log('song edited');
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Updating song info...';
      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (error) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Something went wrong!';
        return;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);
      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Song successfully edited';
    },
    async deleteSong() {
      // deleting song from storage
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);
      await songRef.delete();

      // deleting from collection
      await songsCollection.doc(this.song.docID).delete();
      // removing from array
      this.removeSong(this.index);
    },
  },

};
</script>
