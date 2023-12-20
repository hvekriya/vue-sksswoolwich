<template>
  <div>
    <h2>Slideshow posters</h2>

    <!-- Clicking this button triggers the "click" event of the file input. -->
    <button
      @click="launchImageFile"
      :disabled="isUploadingSlideImage"
      type="button"
      class="btn btn-primary"
    >
      {{ isUploadingSlideImage ? "Uploading..." : "Upload a new slideshow poster" }}
    </button>
    <p>NOTE: Please delete existing poster if you are uploading updated version</p>

    <!-- This is the real file input element. -->
    <input
      ref="imageFile"
      @change.prevent="uploadSlideshowPoster($event.target.files)"
      type="file"
      accept="image/png, image/jpeg"
      class="hidden"
    />

    <table v-if="slideshow.length !== 0">
      <tr>
        <th>Image</th>
        <th>Action</th>
      </tr>
      <tr v-for="(image, imageIndex) in slideshow">
        <td>
          <img :src="image" class="img-responsive" :key="imageIndex" style="width: 25%" />
        </td>
        <td>
          <button
            @click="deleteImage(image)"
            :disabled="isDeletingImage"
            type="button"
            class="bg-red-500 border-red-300 text-white"
          >
            {{ isDeletingImage ? "Deleting..." : "Delete" }}
          </button>
        </td>
      </tr>
    </table>
    <h3 v-else>No posters uploaded.</h3>
  </div>
</template>

<script>
export default {
  name: "UploadSlidePosters",
  data() {
    return {
      isUploadingSlideImage: false,
      isDeletingImage: false,
      slideshow: [],
    };
  },

  methods: {
    getSlideshow() {
      // Get firebase images
      const fireStorage = this.$fire.storage.ref("slideshow/");
      fireStorage
        .listAll()
        .then((res) => {
          let _slideshow = [];
          res.items.forEach((itemRef) => {
            this.$fire.storage
              .ref(itemRef.fullPath)
              .getDownloadURL()
              .then((url) => {
                _slideshow.push(url);
              })
              .catch((e) => {
                console.log(e);
              });
          });
          this.slideshow = _slideshow;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    launchImageFile() {
      // Trigger the file input click event.
      this.$refs.imageFile.click();
    },
    uploadSlideshowPoster(files) {
      if (!files.length) {
        return;
      }
      const file = files[0];

      if (!file.type.match("image.*")) {
        alert("Please upload an image.");
        return;
      }

      const metadata = {
        contentType: file.type,
      };

      this.isUploadingSlideImage = true;

      // Create a reference to the destination where we're uploading
      // the file.
      const storage = this.$fire.storage;
      const imageRef = storage.ref(`slideshow/${file.name}`);

      const uploadTask = imageRef
        .put(file, metadata)
        .then(() => {
          window.location.reload(true);
          // Once the image is uploaded, obtain the download URL, which
          // is the publicly accessible URL of the image.
          return snapshot.ref.getDownloadURL().then((url) => {
            return url;
          });
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });

      // When the upload ends, set the value of the blog image URL
      // and signal that uploading is done.
      uploadTask.then((url) => {
        this.isUploadingSlideImage = false;
      });
    },
    deleteImage(image) {
      this.$fire.storage
        .refFromURL(image)
        .delete()
        .then(() => {
          window.location.reload(true);
        })
        .catch((error) => {
          console.error("Error deleting image", error);
        });
    },
    logout() {
      this.$fire.auth.signOut().then((result) => {
        this.user = "";
        this.$router.push("/admin-dash/auth");
      });
    },
  },
  beforeMount() {
    this.getSlideshow();
  },
};
</script>

<style scoped>
table,
th,
td {
  padding: 20px;
  border: 1px solid black;
}
strong {
  font-weight: 900;
}
</style>
