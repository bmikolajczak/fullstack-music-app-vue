export default {
  // function will run before el is inserten in doc
  beforeMount(el, binding) {
    let iconClass = `fas fa-${binding.value.icon} text-green-400 text-xl`;

    if (binding.value.right) {
      iconClass += ' float-right';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
