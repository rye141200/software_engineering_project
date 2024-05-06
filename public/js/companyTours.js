'use strict';

//! Elements and variables
const deleteBtns = document.querySelectorAll('.delete-btn');
const modal = document.getElementById('modal');
const cancelBtn = document.getElementById('cancelBtn');
const deleteConfirmBtn = document.getElementById('deleteBtn');

//! Helper functions

const deleteTour = (btn) => {
  const card = btn.closest('.card');
  let tourName = card.querySelector('.heading-tertirary span').textContent;
  tourName = tourName.split(' ').join('-');

  return fetch(`/tours/${tourName}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tourName }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Tour deleted successfully');
        card.remove();
      } else {
        console.error('Failed to delete tour:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error deleting tour:', error);
    });
};

const showModal = () => {
  modal.style.display = 'flex';
};

const hideModal = () => {
  modal.style.display = 'none';
};

//! Event handlers

deleteBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    showModal();
    deleteConfirmBtn.onclick = () => {
      deleteTour(btn).then(() => {
        hideModal();
      });
    };
  });
});

cancelBtn.addEventListener('click', hideModal);
