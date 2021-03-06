// utility functions

const selectEle = (e) => document.querySelector(e);
const selectAllEle = (e) => document.querySelectorAll(e);

const createEle = (ele, attrs = {}) => {
  const el = document.createElement(ele);
  for (let attr in attrs) {
    const value = attrs[attr];
    if (attr == "innerText") el.innerText = value;
    else el.setAttribute(attr, value);
  }
  return el;
};

// show alert box
const alertBox = selectEle(".alert-box");
const showAlert = (msg) => {
  alertBox.classList.add("active");
  alertBox.innerText = msg;
  setTimeout((e) => {
    alertBox.classList.remove("active");
    alertBox.innerText = "";
  }, 5000);
};
const validateYouTubeUrl = (url) => {
  if (url) {
    let regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(regExp)) {
      return true;
    }
  }
  return false;
};
const getVideoId = (url) => {
  if (url?.startsWith("https://www.youtube.com/shorts/")) {
    return url?.split("/")[4];
  } else {
    let regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
};
const getThumbnails = (id) => [
  {
    url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/maxres1.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/maxres2.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/maxres3.jpg`,
    size: "1280x720",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    size: "640x480",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sd1.jpg`,
    size: "640x480",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sd2.jpg`,
    size: "640x480",
  },
  {
    url: `https://img.youtube.com/vi/${id}/sd3.jpg`,
    size: "640x480",
  },
  {
    url: `https://i3.ytimg.com/vi/${id}/hqdefault.jpg`,
    size: "480x360",
  },
  {
    url: `https://i.ytimg.com/vi/${id}/hq1.jpg`,
    size: "480x360",
  },
  {
    url: `https://i.ytimg.com/vi/${id}/hq2.jpg`,
    size: "480x360",
  },
  {
    url: `https://i.ytimg.com/vi/${id}/hq3.jpg`,
    size: "480x360",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mq1.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mq2.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/mq3.jpg`,
    size: "320x180",
  },
  {
    url: `https://img.youtube.com/vi/${id}/default.jpg`,
    size: "120x90",
  },
  {
    url: `https://img.youtube.com/vi/${id}/1.jpg`,
    size: "120x90",
  },
  {
    url: `https://img.youtube.com/vi/${id}/2.jpg`,
    size: "120x90",
  },
  {
    url: `https://img.youtube.com/vi/${id}/3.jpg`,
    size: "120x90",
  },
];
selectEle("form").onsubmit = (e) => {
  e.preventDefault();
  let url = selectEle("input")?.value;
  if (
    !validateYouTubeUrl(url) &&
    !url?.startsWith("https://www.youtube.com/shorts")
  )
    showAlert("Invalid Youtube Link");
  else {
    if (
      validateYouTubeUrl(url) ||
      url?.startsWith("https://www.youtube.com/shorts")
    ) {
      const thumbnails = selectEle(".thumbnails");
      thumbnails.innerHTML = "";
      getThumbnails(getVideoId(url)).map((item) => {
        const ele = `
          <div class="col-12 col-md-6 col-lg-3 ">
            <div class="aspect-video card mb-4 text-white">
                <div class="size rounded px-2 py-1 bg-primary ">
                    ${item?.size}
                </div>
                <div class="download-btn btn btn-success" title="Download">
                    <a href="${item?.url}" class="text-white" download="Youtube Thumbnail in ${item?.size}.jpg">
                        <i class="fa fa-download"></i>
                    </a>
                </div>
                <img src="${item?.url}" alt="Youtube Thumbnail in ${item?.size}">
            </div>
        </div>
          `;
        thumbnails.innerHTML += ele;
      });
    }
  }
};
