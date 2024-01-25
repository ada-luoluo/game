<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="white-common">
        <div class="black-common">
          <header>
            <h3>{{ title }}</h3>
            <div @click="closeModal" class="close" >X</div>
          </header>
          <div class="modal-body">
            <slot></slot>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      // default: "Modal"
    },
    buttonName:{
      type: String,
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
      this.$emit("close");
    },
    confirm() {
      this.showModal = false;
      this.$emit("confirm");
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

.modal-content {
  background-color: #000;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 80%;
  max-width: 500px;

}

.modal-overlay header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-overlay header h3{
  width: 100%;
  text-align: center;
}

.modal-overlay footer {
  display: flex;

  position: relative;
}



.modal-overlay .close {
  padding: 10px;
  border: none;
  border-radius: 0px;
  cursor: pointer;
  background: transparent;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
}

.modal-content .black-common{
  display: inherit;
  padding: 20px;
  position: relative;
}

.modal-overlay .modal-body{
  padding: 10px 0;
}





</style>