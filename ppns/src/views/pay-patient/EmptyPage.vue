<template>
  <div>
    <PageContent>
      <div class="container pt-3 pt-sm-5 mb-3">
        <h1></h1>
        
      </div>
    </PageContent>
    <ContinueBar :hasLoader='isLoading' @continue="validateFields()" />
  </div>
</template>

<script>
import pageStateService from '../../services/page-state-service';
import {
  routes,
  isPastPath,
} from '../../router/routes';
import {
  scrollTo,
  scrollToError,
  scrollToElement,
  getTopScrollPosition
} from '../../helpers/scroll';
import ContinueBar from '../../components/ContinueBar.vue';
import PageContent from '../../components/PageContent.vue';
import {
  Button,
  PhnInput,
  Radio,
  phnValidator
} from 'common-lib-vue';
import {
  MODULE_NAME as formModule,
  RESET_FORM,
  SET_ACCOUNT_TYPE,
  SET_PERSON_MOVING,
  SET_IS_ALL_DEPENDENTS_MOVING,
  SET_DEPENDENT_PHNS,
} from '../../store/modules/form';
import { required } from 'vuelidate/lib/validators';
import apiService from '../../services/api-service';
import logService from '../../services/log-service';

export default {
  name: 'EmptyPage',
  components: {
    ContinueBar,
    PageContent,
  },
  data: () => {
    return {
      isPageLoaded: false,
    };
  },
  created() {
    
    setTimeout(() => {
      this.isPageLoaded = true;
    }, 0);

    logService.logNavigation(
      this.$store.state.form.applicationUuid,
      routes.ACCOUNT_TYPE_PAGE.path,
      routes.ACCOUNT_TYPE_PAGE.title
    );
  },
  validations() {
    const validations = {};
    return validations;
  },
  methods: {
    validateFields() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        scrollToError();
        return;
      }

      // Save values here.
      
      // Navigate to next path.
      const toPath = routes.MOVE_INFO_PAGE.path;
      pageStateService.setPageComplete(toPath);
      pageStateService.visitPage(toPath);
      this.$router.push(toPath);
      scrollTo(0);
    },
  },
  // Required in order to block back navigation.
  beforeRouteLeave(to, from, next) {
    pageStateService.setPageIncomplete(from.path);
    if (to.path === routes.HOME_PAGE.path) {
      this.$store.dispatch(formModule + '/' + RESET_FORM);
      next();
    } else if ((pageStateService.isPageComplete(to.path)) || isPastPath(to.path, from.path)) {
      next();
    } else {
      // Navigate to self.
      const topScrollPosition = getTopScrollPosition();
      next({
        path: routes.ACCOUNT_TYPE_PAGE.path,
        replace: true
      });
      setTimeout(() => {
        scrollTo(topScrollPosition);
      }, 0);
    }
  }
}
</script>

<style scoped>

</style>