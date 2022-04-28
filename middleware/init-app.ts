import {Middleware} from "@nuxt/types";
import stepStore from "~/store/stepStore";
import {getModule} from "nuxt-property-decorator";

const middleware: Middleware = context => {
  const step = getModule(stepStore,context.store)
  if (!step.introState) {
    if (context.route.path === '/intro') {
    } else {
      return context.redirect('/intro')
    }
  }
}

export default middleware
