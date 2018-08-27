export const navigation = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    name: "Pages",
    url: "/pages",
    icon: "icon-puzzle",
    children: [
      {
        name: "Home",
        url: "/pages/home",
        icon: "icon-puzzle"
      },

      {
        name: "About us",
        url: "/pages/about",
        icon: "icon-puzzle"
      },
      {
        name: "Service Center",
        url: "/pages/servicecenter",
        icon: "icon-puzzle"
      },
      {
        name: "Showrooms",
        url: "/pages/showrooms",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "Cars",
    url: "/cars",
    icon: "icon-puzzle",
    children: [
      {
        name: "Brand",
        url: "/cars/car-brands",
        icon: "icon-puzzle"
      },

      {
        name: "Models",
        url: "/cars/car-models",
        icon: "icon-puzzle"
      },
      {
        name: "Car Details",
        url: "/cars/car-details",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "Requests",
    url: "/request",
    icon: "icon-puzzle",
    children: [
      {
        name: "Contact Us",
        url: "/request/contact-us",
        icon: "icon-puzzle"
      },

      {
        name: "Request Qoutes",
        url: "/request/request-qoute",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "Maintenance",
    url: "/maintenance",
    icon: "icon-puzzle",
    children: [
      {
        name: "Requests",
        url: "/maintenance/requests",
        icon: "icon-puzzle"
      },
      {
        name: "Maintenance Type",
        url: "/maintenance/maintenance-type",
        icon: "icon-puzzle"
      },
      {
        name: "Car Type",
        url: "/maintenance/car-type",
        icon: "icon-puzzle"
      },
      {
        name: "Test Drive",
        url: "/maintenance/test-drive",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "Users",
    url: "/users",
    icon: "icon-puzzle",
    children: [
      {
        name: "All Admins",
        url: "/users/all-admins",
        icon: "icon-puzzle"
      },
      {
        name: "All Customers",
        url: "/users/all-customers",
        icon: "icon-puzzle"
      },
      {
        name: "Add Admin",
        url: "/users/add-admin",
        icon: "icon-puzzle"
      },
      {
        name: "Add Customer",
        url: "/users/add-customer",
        icon: "icon-puzzle"
      },
      {
        name: "Admin Mail List",
        url: "/users/email-list",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "Blogs",
    url: "/blog",
    icon: "icon-puzzle",
    children: [
      {
        name: "All Blogs",
        url: "/blogs/all-blogs",
        icon: "icon-puzzle"
      },
      {
        name: "Add Blog",
        url: "/blogs/add-blog",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "FAQs",
    url: "/faqs",
    icon: "icon-puzzle",
    children: [
      {
        name: "All FAQs",
        url: "/faqs/all-faqs",
        icon: "icon-puzzle"
      },
      {
        name: "Add FAQs",
        url: "/faqs/add-faqs",
        icon: "icon-puzzle"
      }
    ]
  },
  {
    name: "News",
    url: "/news",
    icon: "icon-puzzle",
    children: [
      {
        name: "All News",
        url: "/news/all-news",
        icon: "icon-puzzle"
      },
      {
        name: "Add News",
        url: "/news/add-news",
        icon: "icon-puzzle"
      }
    ]
  }
];
