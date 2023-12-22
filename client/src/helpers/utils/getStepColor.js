

export const getStepColor = (step) => {
  switch (step) {
    case 0:
      return getComputedStyle(document.documentElement).getPropertyValue('--warning');
    case 1:
      return getComputedStyle(document.documentElement).getPropertyValue('--primary');
    case 2:
      return getComputedStyle(document.documentElement).getPropertyValue('--success');
    case 3:
      return getComputedStyle(document.documentElement).getPropertyValue('--info');
    case 4:
      return getComputedStyle(document.documentElement).getPropertyValue('--info');
    case 5:
      return getComputedStyle(document.documentElement).getPropertyValue('--success');
    case 6:
      return getComputedStyle(document.documentElement).getPropertyValue('--danger');
    default:
      return getComputedStyle(document.documentElement).getPropertyValue('--dark');
  }
};

