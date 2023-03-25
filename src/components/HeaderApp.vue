<template>
    <header class="flex flex-wrap py-2 bg-[#7b506f]">
      <div class="flex items-center justify-between w-full px-10">
        <div>
          <nav
            class="relative flex items-center justify-center px-2 py-3 rounded"
          >
            <div else
              class="container px-4 mx-auto flex flex-wrap items-center justify-between"
            >
              <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li class="nav-item">
                  <router-link
                    to="/"
                    active-class="active-link"
                    exact-active-class="exact-active-link"
                    class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                     Facebook
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    to="/register"
                    active-class="active-link"
                    exact-active-class="exact-active-link"
                    class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                     Register
                  </router-link>
                </li>
               </ul> 
               
          </div>
  
          </nav>
        </div>
        
      </div>
    </header>
  </template>
  
  <script>
 
  export default {
    name: "HeaderApp",
    data() {
      return {
      };
    },
    
  };
  </script>
  <style>
  .active {
    color: #09054b;
  }
  .exact-active-link {
    color: #09054b;
    font-weight: bold;
  }
  
  </style>