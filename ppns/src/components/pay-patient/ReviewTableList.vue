<template>
  <div :class="className">

    <div class="row align-items-end mt-3">
      <div class="col-9">
        <h2 class="mb-2">Section title here</h2>
      </div>
      <div v-if='showEditButtons'
          class="col-3 text-right">
        <a href="javascript:void(0)"
           @click="navigateToClaimCountPage()">Edit 
          <font-awesome-icon icon="pencil-alt" />
        </a>
      </div>
    </div>
    <ReviewTable :elements='tableData'
                :backgroundColor='tableBackgroundColor'/>

  </div>
</template>

<script>
import ReviewTable from '@/components/ReviewTable.vue';
import { payPatientRoutes } from '@/router/routes';
import { scrollTo } from '@/helpers/scroll';
import pageStateService from '@/services/page-state-service';

export default {
  name: 'PayPatientReviewTableList',
  components: {
    ReviewTable,
  },
  props: {
    showEditButtons: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    tableBackgroundColor: {
      type: String,
    }
  },
  computed: {
    tableData() {
      const items = [];
      items.push({
        label: 'Data element:',
        value: 'Value here',
      });
      return items;
    },
  },
  methods: {
    navigateToClaimCountPage() {
      const toPath = payPatientRoutes.CLAIM_COUNT_PAGE.path;
      pageStateService.setPageComplete(toPath);
      this.$router.push(toPath);
      scrollTo();
    },
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
