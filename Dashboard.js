$(".menu > ul > li").click(function (e) {
  // Check if sidebar is minimized
  if ($(".sidebar").hasClass("active")) {
    return; // Do nothing if sidebar is minimized
  }
  // remove active from already active
  $(this).siblings().removeClass("active");
  // add active to clicked
  $(this).toggleClass("active");
  // if has sub menu open it
  $(this).find("ul").slideToggle();
  // close other sub menu if any open
  $(this).siblings().find("ul").slideUp();
  // remove active class of sub menu items
  $(this).siblings().find("ul").find("li").removeClass("active");
});

$(".menu-btn").click(function () {
  $(".sidebar").toggleClass("active");

  if ($(".sidebar").hasClass("active")) {
    // Close all open submenus
    $(".menu > ul > li").removeClass("active");
    $(".menu > ul > li").find("ul").slideUp();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('darkModeToggle');

  // Check if dark mode is already enabled
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
  }

  // Toggle dark mode when the switch is clicked
  toggleSwitch.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});