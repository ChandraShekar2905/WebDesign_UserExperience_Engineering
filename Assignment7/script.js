document.addEventListener('DOMContentLoaded', () => {
  // Filter functionality for destinations page
  const filterForm = document.querySelector('.filter__container');
  
  if (filterForm) {
    const applyFilterBtn = filterForm.querySelector('.btn');
    const regionSelect = document.getElementById('region');
    const themeSelect = document.getElementById('theme');
    const budgetSelect = document.getElementById('budget');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    applyFilterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const selectedRegion = regionSelect.value;
      const selectedTheme = themeSelect.value;
      const selectedBudget = budgetSelect.value;
      
      // Show visual feedback that filters are being applied
      destinationCards.forEach(card => {
        card.style.opacity = '0.6';
        setTimeout(() => {
          // Reset opacity after transition
          card.style.opacity = '1';
        }, 300);
      });
      
      // Apply filters
      destinationCards.forEach(card => {
        // Get card data for filtering
        const cardRegion = card.querySelector('.destination-card__tag').textContent.toLowerCase();
        const cardTheme = card.querySelector('.destination-card__theme').textContent.toLowerCase();
        const cardBudget = card.querySelector('.destination-card__budget').textContent.toLowerCase();
        
        // Check if card matches all selected filters
        let showCard = true;
        
        if (selectedRegion && !cardRegion.includes(selectedRegion.toLowerCase())) {
          showCard = false;
        }
        
        if (selectedTheme && !cardTheme.includes(selectedTheme.toLowerCase())) {
          showCard = false;
        }
        
        if (selectedBudget && !cardBudget.includes(selectedBudget.toLowerCase())) {
          showCard = false;
        }
        
        // Show or hide card based on filter
        if (showCard) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show a message if no results
      const visibleCards = document.querySelectorAll('.destination-card[style="display: block"]');
      const noResultsMessage = document.querySelector('.no-results-message');
      
      if (visibleCards.length === 0) {
        // Create message if it doesn't exist
        if (!noResultsMessage) {
          const message = document.createElement('p');
          message.className = 'no-results-message';
          message.textContent = 'No destinations match your filters. Please try different criteria.';
          message.style.textAlign = 'center';
          message.style.padding = '2rem';
          message.style.color = '#2c3e50';
          message.style.fontWeight = '500';
          
          const destinationGrid = document.querySelector('.destinations-grid__container');
          destinationGrid.appendChild(message);
        } else {
          noResultsMessage.style.display = 'block';
        }
      } else if (noResultsMessage) {
        // Hide message if there are results
        noResultsMessage.style.display = 'none';
      }
      
      // Show feedback message
      const feedbackMsg = document.createElement('div');
      feedbackMsg.className = 'filter-feedback';
      feedbackMsg.textContent = 'Filters applied successfully!';
      feedbackMsg.style.color = '#2ecc71';
      feedbackMsg.style.marginTop = '10px';
      feedbackMsg.style.textAlign = 'center';
      feedbackMsg.style.padding = '0.5rem';
      feedbackMsg.style.fontWeight = '500';
      
      // Remove any existing feedback
      const existingFeedback = filterForm.querySelector('.filter-feedback');
      if (existingFeedback) {
        existingFeedback.remove();
      }
      
      filterForm.appendChild(feedbackMsg);
      
      // Remove the feedback after 3 seconds
      setTimeout(() => {
        feedbackMsg.remove();
      }, 3000);
    });
    
    // Add a reset button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn btn--secondary';
    resetBtn.textContent = 'Reset Filters';
    resetBtn.style.marginLeft = '10px';
    
    // Insert reset button after apply button
    applyFilterBtn.insertAdjacentElement('afterend', resetBtn);
    
    // Add reset functionality
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Reset all select dropdowns
      regionSelect.value = '';
      themeSelect.value = '';
      budgetSelect.value = '';
      
      // Show all cards
      destinationCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '0.6';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 300);
      });
      
      // Hide no results message if exists
      const noResultsMessage = document.querySelector('.no-results-message');
      if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
      }
      
      // Show reset feedback
      const feedbackMsg = document.createElement('div');
      feedbackMsg.className = 'filter-feedback';
      feedbackMsg.textContent = 'Filters have been reset!';
      feedbackMsg.style.color = '#3498db';
      feedbackMsg.style.marginTop = '10px';
      feedbackMsg.style.textAlign = 'center';
      feedbackMsg.style.padding = '0.5rem';
      feedbackMsg.style.fontWeight = '500';
      
      // Remove any existing feedback
      const existingFeedback = filterForm.querySelector('.filter-feedback');
      if (existingFeedback) {
        existingFeedback.remove();
      }
      
      filterForm.appendChild(feedbackMsg);
      
      // Remove the feedback after 3 seconds
      setTimeout(() => {
        feedbackMsg.remove();
      }, 3000);
    });
  }
});