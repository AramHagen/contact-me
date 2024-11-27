// TODO
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const messageElement = document.getElementById('message');
const contactForm = document.getElementById('contact-form');
const contactKindElement = document.getElementById('contact-kind');
const jobElement = document.getElementById('job');
const codeElement = document.getElementById('code');

const minLengthValidation = (element, min) => {
  if (element.value.trim().length >= min) {
    handleErrorMessage(element, false);
    return true;
  } else {
    const message = `Please add at least ${min} character for ${element.name}`;
    handleErrorMessage(element, true, message);
    return false;
  }
};

const emailValidation = (element) => {
  const regex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}(?<!\.)$/;
  if (regex.test(element.value.trim())) {
    handleErrorMessage(element, false);
    return true;
  } else {
    const message = `The email is not valid`;
    handleErrorMessage(element, true, message);
    return false;
  }
};
const checkURLValidity = (element) => {
  const regex = /https?\:\/\/.+\..+/;
  if (regex.test(element.value.trim())) {
    handleErrorMessage(element, false);
    return true;
  } else {
    const message = 'The Url is not valid.';
    handleErrorMessage(element, true, message);
    return false;
  }
};

const handleErrorMessage = (element, isShow, message) => {
  const errorElement = [...element.parentElement.children].find((x) =>
    x.classList.contains('error')
  );
  if (isShow) {
    element.parentElement.classList.add('invalid');
    errorElement.innerText = message;
    errorElement.classList.remove('hidden');
  } else {
    errorElement.classList.add('hidden');
    element.parentElement.classList.remove('invalid');
  }
};

contactKindElement.addEventListener('change', () => {
  const jobTitleElement = document.getElementById('job-title');
  const companyWebsiteElement = document.getElementById('company-website');
  const languageElement = document.getElementById('coding-language');

  if (contactKindElement.value === 'business') {
    jobElement.classList.remove('hidden');
    codeElement.classList.add('hidden');
    resetField(languageElement, '');
  } else if (contactKindElement.value === 'technical') {
    jobElement.classList.add('hidden');
    codeElement.classList.remove('hidden');
    resetField(jobTitleElement);
    resetField(companyWebsiteElement);
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const validations = [
    { isValid: minLengthValidation(nameElement, 3), field: 'Name' },
    { isValid: emailValidation(emailElement), field: 'Email' },
    { isValid: minLengthValidation(messageElement, 10), field: 'Message' },
  ];

  if (!jobElement.classList.contains('hidden')) {
    validations.push(
      { isValid: jobTitleValidity(), field: 'Job Title' },
      { isValid: websiteValidity(), field: 'Company Website' }
    );
  }

  if (!codeElement.classList.contains('hidden')) {
    validations.push({
      isValid: validateCodingLanguage(),
      field: 'Coding Language',
    });
  }

  const invalidFields = validations.filter((x) => !x.isValid);
  if (invalidFields.length > 0) {
    console.log('BAD INPUT:', invalidFields.map((v) => v.field).join(', '));
    return;
  }

  console.log('Form Submitted Successfully');
  resetForm();
});

const validateCodingLanguage = () => {
  const languageElement = document.getElementById('coding-language');
  if (!languageElement.value.trim()) {
    handleErrorMessage(
      languageElement,
      true,
      'Please specify a coding language.'
    );
    return false;
  } else {
    handleErrorMessage(languageElement, false);
    return true;
  }
};
const jobTitleValidity = () => {
  const jobTitleElement = document.getElementById('job-title');
  if (!jobTitleElement.value.trim()) {
    handleErrorMessage(jobTitleElement, true, 'Job title is required.');
    return false;
  } else if (jobTitleElement.value.trim()) {
    handleErrorMessage(jobTitleElement, false);
    return true;
  }
};
const websiteValidity = () => {
  const companyWebsiteElm = document.getElementById('company-website');
  if (!companyWebsiteElm.value.trim()) {
    handleErrorMessage(companyWebsiteElm, true, 'Company website is required.');
    return false;
  } else if (companyWebsiteElm.value.trim()) {
    const result = checkURLValidity(companyWebsiteElm);
    return result;
  }
};
const resetForm = () => {
  contactForm.reset();
  jobElement.classList.add('hidden');
  codeElement.classList.add('hidden');
};
const resetField = (element, initial) => {
  handleErrorMessage(element, false);
  element.value = initial ? initial : '';
};
