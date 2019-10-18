import contact from "../store/Contact";

import { capitalize } from "lodash";

// Used for textarea
const { validators } = contact;

const customValidator = {
  validateMsg(
    val,
    { minLength, maxLength }
  ) {
    if (val.length > minLength && val.length > maxLength) {
      return true;
    }

    return false;
  }
};

function updateValidationClasses(el, isValid) {
  if (isValid) {
    el.classList.remove("is-invalid");
    el.classList.add("is-valid");
  } else {
    el.classList.remove("invalid");
    el.classList.add("is-invalid");
  }
}

export default () => {
  const inputs = document.querySelectorAll("input[id], textarea");

  inputs.forEach(input => {
    input.addEventListener("blur", function() {
      const val = this.value;
      const patt = this.pattern;

      if (patt) {
        updateValidationClasses(this, RegExp(patt).test(val))
      } else {
        const id = input.id;
        updateValidationClasses(this, customValidator[`validate${capitalize(id)}`](val, validators[id]))
      }
    });
  });
};
