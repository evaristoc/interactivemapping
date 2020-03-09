<template>
      <div class="modal fade" id="myModal_map" style="background-color: rgba(0, 0, 0, 0.6);">
            <!-- REFERENCES -->
            <!--https://www.w3schools.com/bootstrap4/tryit.asp?filename=trybs_modal&stacked=h-->
            <!--https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal_img-->
          <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content mb-0 p-0" style="background-color: rgba(255, 255, 255, 0.6);">
              <!-- Modal body -->
              <div class="modal-body">
                <div class="container-fluid">
                  <button type="button" class="btn btn-warning close-modal" @click="closeModal()">&times;</button>
                  <input v-model="namelocation" placeholder="Give it a name">
                </div>
              </div>
              <!-- Modal Footer -->
              <div class="modal-footer">
                <h5 id="modal-title_map" style="color:blue"></h5>
              </div>
            </div>
          </div>
      </div>
</template>
<script>
export default {
  data(){
    return {
      namelocation:'',
    }
  },
  props: [],
  methods:{
      closeModal(){
        //let span = document.getElementsByClassName("close-modal")[0];
        let modal = document.getElementById('myModal_map');
        modal.classList.remove('show');
        modal.style.display = "none";
      },
  }
}
</script>