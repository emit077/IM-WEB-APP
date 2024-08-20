import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import project from "../helper/project-config";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light:
        project.NAME == "TF"
          ? {
            primary: "#32345F", // changed
            secondary: "#b0bec5",
            accent: "#8c9eff",
            success: "#27ae60",
            error: "#FF1515", //"#b71c1c",
            "custom-1": "#8180A6",
            theme_yellow: "#FFF200",
            theme_green: "#4CAF50",
          }
          : {
            primary: "#042390", // changed
            secondary: "#DD4C23",
            accent: "#8c9eff",
            error: "#b71c1c",
            "custom-1": "#8180A6",
            theme_yellow: "#FFF200",
            theme_green: "#4CAF50",
            surface: "#f3f6fc"

          },
    },
  },
});
