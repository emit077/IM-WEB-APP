export default {
  data() {
    return {
      grade_list: "",
      grade_loading: false,
      city: "",
      state: "",
      pin_loading: false,
      city_list: null,
      city_search_query: null,
    };
  },
  methods: {
    /* fetching shipment list */
    getGradeList(is_cancel = true) {
      const self = this;
      self.grade_loading = true;
      let params = {};
      const successHandler = (response) => {
        if (response.data.success) {
          this.grade_list = response.data.grade_list;
        }
      };
      const finallyHandler = () => {
        self.grade_loading = false;
      };

      self.request_GET(
        self,
        self.$urls.GRADE_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    /*convert date formte to dd-mm-yyyy*/
    display_date_format(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      let new_date = `${day}-${month}-${year}`;
      return new_date;
    },
    /* fetching city list */
    getCityList(is_cancel = true, is_autocomplete = "Yes", search_query = null) {
      const self = this;
      let params = {
        is_autocomplete: is_autocomplete,
        search_query: search_query
          ? search_query : self.city_search_query,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          this.city_list = response.data.city_list;
        }
      };
      const finallyHandler = () => { };

      self.request_GET(
        self,
        self.$urls.LIST_PIN_CODE,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    /* fetching pin code details */
    getPincodeData(pin_code) {
      const self = this;
      self.pin_loading = true;
      let params = {
        pin_code: pin_code,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          this.city = response.data.city;
          this.state = response.data.state;
          return response.data
        }
      };
      const finallyHandler = () => {
        self.pin_loading = false;
      };
      self.request_GET(
        self,
        self.$urls.MATCH_PIN_CODE,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
  },
};
