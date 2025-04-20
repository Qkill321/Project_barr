document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector('.dropdown-toggle');
      const content = dropdown.querySelector('.dropdown-content');
  
      button.addEventListener('click', (e) => {
        e.stopPropagation();
  
  
        document.querySelectorAll('.dropdown-content').forEach((el) => {
          if (el !== content) el.style.display = 'none';
        });
  
  
        content.style.display =
          content.style.display === 'block' ? 'none' : 'block';
      });
    });
  
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown-content').forEach((el) => {
        el.style.display = 'none';
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector('.dropdown-toggle');
      const content = dropdown.querySelector('.dropdown-content');
  
      button.addEventListener('click', (e) => {
        e.stopPropagation();
  
        // ปิด dropdown อื่น
        document.querySelectorAll('.dropdown').forEach((d) => {
          if (d !== dropdown) d.classList.remove('open');
        });
  
        // toggle dropdown ตัวนี้
        dropdown.classList.toggle('open');
      });
    });
  
    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown').forEach((d) => {
        d.classList.remove('open');
      });
    });
  });
  
  