<template>
  <div>
    <header-app />
    <div>
      <div>
        <div>
          <div>
            <label>Image</label>

            <input
              ref="image"
              id="image"
              type="file"
              name="image"
              accept="image/*"
              class="form-control"
              style="border: none"
              @change="loadImage($event)"
            />
          </div>
          <div>
            <img
              :src="this.image_file"
              class="uploading-image img-thumbnail"
              height="128"
              alt="Preview"
            />
          </div>
        </div>

        <button type="submit" @click="submitImage">Upload</button>
      </div>
    </div>
    <footer-app />
  </div>
</template>

<script>
import { useAuthStore } from "@/store/auth";
import { mapState } from "pinia";
import axios from "axios";

export default {
  name: "AvatarApp",

  data() {
    return {
      formData: new FormData(),

      file: null,
      image_file: "",
    };
  },

  computed: {
    ...mapState(useAuthStore, ["accountName"]),
  },

  methods: {
    loadImage(e) {
      this.file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.image_file = e.target.result;
      };
      console.log(this.file);
    },

    submitImage() {
      this.formData.append("image", this.file, this.file.name);

      console.log(this.formData);

      axios
        .post("http://localhost:80/api/avatar/file", this.formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error.data);
        });
    },
  },

  mounted() {
    
  },
};
</script>

<style lang="scss" scoped></style>
