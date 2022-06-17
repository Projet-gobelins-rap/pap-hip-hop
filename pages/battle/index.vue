<template>
  <section class="battle">
    <div class="battle-overlay">
      <video
        class="battle-transitionVideo battle-video"
        ref="transitionRound1"
        :src="TransitionRound1"
      ></video>
      <video
        class="battle-transitionVideo battle-video"
        ref="transitionRound2"
        :src="TransitionRound2"
      ></video>
    </div>
    <canvas id="canvasGlobalScene" ref="battleScene"></canvas>

    <video class="battle-video" autoplay loop muted :src="bgVideo"></video>

    <div class="battle-end">
      <video
        class="battle-end--video battle-video"
        ref="videoLoose"
        :src="videoLoose"
      ></video>
      <video
        class="battle-end--video battle-video"
        ref="videoVictory"
        :src="videoVictory"
      ></video>
    </div>

    <div class="battle-hud">
      <div class="battle-top">
        <div v-if="pp" class="healthbar player">
          <div class="healthbar-container">
            <span class="healthbar-gauge" ref="playerGauge"></span>
          </div>
          <img class="healthbar-img" :src="pp.src" alt="" />
        </div>
        <div v-if="pp" class="healthbar opponent">
          <img class="healthbar-img" :src="pp.src" alt="" />
          <div class="healthbar-container">
            <span class="healthbar-gauge" ref="opponentGauge"></span>
          </div>
        </div>
      </div>
      <div class="battle-center"></div>
    </div>

    <div>
      <span class="battle-damage" ref="damage"></span>
      <svg
        class="battle-combo"
        width="162"
        height="123"
        viewBox="0 0 162 123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1321_6040)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.1871 62.8045C18.7984 65.8828 16.2136 68.2985 13.1128 68.1902L10.9445 68.1145C7.82317 68.0055 5.20448 70.4474 5.09549 73.5687L4.19735 99.2881C4.08835 102.409 6.53031 105.028 9.65163 105.137L138.263 109.628C141.384 109.737 144.003 107.295 144.112 104.174L145.01 78.4547C145.119 75.3334 142.677 72.7147 139.556 72.6057L138.026 72.5523C134.926 72.444 132.516 69.8539 132.343 66.7559C132.002 60.6586 130.85 54.6435 128.915 48.9049C126.323 41.2156 122.375 34.1732 117.298 28.1801C112.221 22.1869 106.114 17.3602 99.325 13.9756C92.5362 10.591 85.1988 8.71472 77.7318 8.45397C70.2648 8.19321 62.8144 9.55306 55.806 12.4559C48.7976 15.3587 42.3685 19.7476 36.8857 25.372C31.4028 30.9964 26.9737 37.7462 23.8512 45.236C21.5208 50.8256 19.9523 56.7457 19.1871 62.8045Z"
            fill="#FEFEFE"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M126.479 50.9819C128.427 56.9903 129.538 63.3063 129.778 69.702C129.885 72.5277 127.494 74.7409 124.668 74.6422L26.2926 71.2069C23.4666 71.1082 21.2364 68.7336 21.5397 65.9222C22.226 59.5589 23.7742 53.3358 26.1368 47.4779C29.1282 40.0611 33.3667 33.3751 38.6101 27.8017C43.8535 22.2282 49.9993 17.8765 56.6966 14.9949C63.3938 12.1134 70.5113 10.7585 77.6427 11.0075C84.7741 11.2565 91.7798 13.1047 98.2597 16.4464C104.74 19.7881 110.567 24.5579 115.409 30.4835C120.251 36.4091 124.012 43.3745 126.479 50.9819ZM142.384 80.3842C142.483 77.5582 140.272 75.1873 137.446 75.0886L12.8759 70.7386C10.05 70.6399 7.67906 72.8508 7.58037 75.6768L6.82321 97.359C6.72452 100.185 8.93543 102.556 11.7614 102.655L136.331 107.005C139.157 107.103 141.528 104.892 141.627 102.066L142.384 80.3842Z"
            fill="#EDCC50"
          />
          <mask id="path-3-inside-1_1321_6040" fill="white">
            <path
              d="M29.8787 42.1431C30.3524 40.9894 32.0057 41.0472 32.3978 42.2311V42.2311C33.2608 44.8372 35.2194 46.9365 37.7595 47.9777V47.9777C38.914 48.451 38.8562 50.1053 37.6715 50.4969V50.4969C35.0649 51.3584 32.9647 53.3159 31.922 55.8554V55.8554C31.4483 57.0091 29.795 56.9514 29.4029 55.7675V55.7675C28.5399 53.1614 26.5813 51.0621 24.0412 50.0209V50.0209C22.8867 49.5476 22.9445 47.8933 24.1292 47.5017V47.5017C26.7357 46.6402 28.836 44.6827 29.8787 42.1431V42.1431Z"
            />
          </mask>
          <path
            d="M29.8787 42.1431C30.3524 40.9894 32.0057 41.0472 32.3978 42.2311V42.2311C33.2608 44.8372 35.2194 46.9365 37.7595 47.9777V47.9777C38.914 48.451 38.8562 50.1053 37.6715 50.4969V50.4969C35.0649 51.3584 32.9647 53.3159 31.922 55.8554V55.8554C31.4483 57.0091 29.795 56.9514 29.4029 55.7675V55.7675C28.5399 53.1614 26.5813 51.0621 24.0412 50.0209V50.0209C22.8867 49.5476 22.9445 47.8933 24.1292 47.5017V47.5017C26.7357 46.6402 28.836 44.6827 29.8787 42.1431V42.1431Z"
            fill="#FEFEFE"
          />
          <path
            d="M24.5309 48.7171C27.4922 47.7383 29.8782 45.5144 31.0627 42.6293L28.6946 41.657C27.7938 43.8509 25.9793 45.5421 23.7275 46.2864L24.5309 48.7171ZM24.5267 48.8365C24.5065 48.8282 24.4987 48.8216 24.4975 48.8206C24.4961 48.8194 24.4957 48.8188 24.4951 48.8179C24.4931 48.8146 24.4863 48.8 24.4872 48.7753C24.4881 48.7506 24.4959 48.7366 24.4981 48.7335C24.4987 48.7326 24.4991 48.732 24.5007 48.7309C24.5019 48.73 24.5101 48.7239 24.5309 48.7171L23.7275 46.2864C21.4142 47.051 21.3014 50.2811 23.5557 51.2052L24.5267 48.8365ZM30.618 55.3651C29.6376 52.4044 27.4125 50.0195 24.5267 48.8365L23.5557 51.2052C25.7501 52.1048 27.4422 53.9184 28.1878 56.1698L30.618 55.3651ZM30.738 55.3693C30.7297 55.3895 30.723 55.3972 30.722 55.3984C30.7208 55.3999 30.7202 55.4003 30.7192 55.4009C30.7159 55.4029 30.7013 55.4097 30.6765 55.4089C30.6518 55.408 30.6376 55.4002 30.6345 55.3979C30.6335 55.3973 30.633 55.3968 30.6318 55.3953C30.6309 55.394 30.6249 55.3858 30.618 55.3651L28.1878 56.1698C28.9533 58.4815 32.1812 58.5942 33.1061 56.3416L30.738 55.3693ZM37.2698 49.2815C34.3085 50.2603 31.9225 52.4842 30.738 55.3693L33.1061 56.3416C34.0069 54.1476 35.8214 52.4565 38.0732 51.7122L37.2698 49.2815ZM37.274 49.1621C37.2942 49.1704 37.302 49.177 37.3031 49.178C37.3046 49.1792 37.305 49.1798 37.3056 49.1807C37.3075 49.184 37.3143 49.1985 37.3135 49.2232C37.3126 49.248 37.3048 49.262 37.3026 49.2651C37.302 49.266 37.3016 49.2665 37.3 49.2677C37.2988 49.2686 37.2906 49.2747 37.2698 49.2815L38.0732 51.7122C40.3865 50.9476 40.4993 47.7174 38.245 46.7933L37.274 49.1621ZM31.1827 42.6335C32.1631 45.5942 34.3882 47.9791 37.274 49.1621L38.245 46.7933C36.0506 45.8938 34.3585 44.0802 33.6129 41.8287L31.1827 42.6335ZM33.6129 41.8287C32.8474 39.5171 29.6195 39.4044 28.6946 41.657L31.0627 42.6293C31.071 42.6091 31.0777 42.6013 31.0787 42.6002C31.0799 42.5987 31.0805 42.5983 31.0815 42.5977C31.0848 42.5957 31.0994 42.5889 31.1242 42.5897C31.1489 42.5906 31.163 42.5984 31.1662 42.6006C31.1671 42.6013 31.1677 42.6017 31.1689 42.6033C31.1698 42.6045 31.1758 42.6128 31.1827 42.6335L33.6129 41.8287Z"
            fill="#151515"
            mask="url(#path-3-inside-1_1321_6040)"
          />
          <path
            d="M97.7663 39.1915C97.5818 44.4782 93.1425 48.615 87.8499 48.4301C82.5573 48.2452 78.4173 43.8087 78.6018 38.5219C78.7863 33.2352 83.2256 29.0984 88.5182 29.2833C93.8108 29.4683 97.9508 33.9047 97.7663 39.1915Z"
            fill="#FEFEFE"
            stroke="#151515"
            stroke-width="1.28"
          />
          <ellipse
            rx="5.11386"
            ry="5.10979"
            transform="matrix(0.99943 0.0349182 -0.0348799 0.999352 90.0335 40.8392)"
            fill="#151515"
          />
          <path
            d="M85.3868 59.6756C85.295 62.3063 84.1634 64.3222 82.4124 65.6695C80.6488 67.0265 78.2186 67.732 75.515 67.6375C72.8113 67.5431 70.4363 66.6697 68.7715 65.1929C67.1187 63.7266 66.1304 61.6367 66.2223 59.006C66.3141 56.3753 67.4457 54.3595 69.1967 53.0122C70.9603 51.6551 73.3905 50.9496 76.0941 51.0441C78.7977 51.1385 81.1728 52.0119 82.8376 53.4887C84.4904 54.955 85.4786 57.0449 85.3868 59.6756Z"
            fill="#E7BC18"
            stroke="#151515"
            stroke-width="1.28"
          />
          <path
            d="M80.2758 59.4971C80.2337 60.7024 79.7353 61.437 78.9832 61.8922C78.1887 62.3732 77.0458 62.5784 75.6931 62.5312C74.3404 62.4839 73.2146 62.1994 72.4555 61.6641C71.737 61.1575 71.291 60.39 71.3331 59.1847C71.3752 57.9795 71.8736 57.2449 72.6256 56.7896C73.4202 56.3087 74.563 56.1034 75.9158 56.1507C77.2685 56.1979 78.3943 56.4825 79.1534 57.0177C79.8719 57.5243 80.3178 58.2919 80.2758 59.4971Z"
            fill="#FEFEFE"
            stroke="#151515"
            stroke-width="1.28"
          />
          <path
            d="M74.1293 38.3658C73.9448 43.6526 69.5055 47.7893 64.2129 47.6044C58.9203 47.4195 54.7803 42.983 54.9648 37.6962C55.1493 32.4095 59.5886 28.2727 64.8812 28.4577C70.1738 28.6426 74.3138 33.0791 74.1293 38.3658Z"
            fill="#FEFEFE"
            stroke="#151515"
            stroke-width="1.28"
          />
          <ellipse
            rx="5.11386"
            ry="5.10979"
            transform="matrix(0.99943 0.0349182 -0.0348799 0.999352 66.3951 40.0136)"
            fill="#151515"
          />
          <path
            d="M19.3491 87.5662C19.4363 85.0691 20.7248 83.9666 25.985 84.1503C29.1984 84.2625 32.5146 84.9521 34.8929 85.5064L35.7505 82.0732C32.9284 81.3188 29.3432 80.7018 25.9661 80.5839C18.3112 80.3166 15.3579 82.734 15.1942 87.4211C15.0305 92.1082 17.8073 94.7462 25.4622 95.0135C28.8393 95.1314 32.4588 94.766 35.3266 94.2104L34.7106 90.7257C32.2995 91.1128 28.9432 91.5694 25.7298 91.4572C20.4697 91.2735 19.2612 90.0837 19.3491 87.5662ZM47.5301 95.8046C55.5329 96.0841 59.0713 93.933 59.2457 88.9389C59.4201 83.9448 56.0404 81.5521 48.0376 81.2727C40.0348 80.9932 36.4964 83.1443 36.322 88.1384C36.1476 93.1325 39.5273 95.5252 47.5301 95.8046ZM47.6545 92.2433C42.0464 92.0474 40.3826 90.9852 40.4769 88.2835C40.5713 85.5818 42.3051 84.6382 47.9132 84.834C53.5008 85.0292 55.1032 86.0892 55.0089 88.791C54.9145 91.4927 53.2421 92.4384 47.6545 92.2433ZM64.9677 96.1267L65.2829 87.1005L72.07 96.3747L76.2658 96.5212L83.6832 87.743L83.368 96.7692L87.5229 96.9143L88.0104 82.9555L83.0368 82.7818L74.3384 93.0317L66.3558 82.1993L61.3003 82.0227L60.8128 95.9816L64.9677 96.1267ZM105.291 97.5348C108.483 97.6463 110.138 96.6384 110.23 93.9776C110.304 91.8695 109.36 90.7504 107.492 90.2548C109.061 89.8998 109.896 88.8838 109.957 87.1441C110.04 84.7494 108.562 83.6731 105.758 83.5752L90.2227 83.0327L89.7352 96.9916L105.291 97.5348ZM104.481 86.666C105.628 86.706 106.106 87.0916 106.076 87.9512C106.046 88.8109 105.419 89.1578 104.498 89.1257L94.121 88.7633L94.2068 86.3072L104.481 86.666ZM104.744 92.0647C105.788 92.1011 106.433 92.4105 106.398 93.393C106.363 94.3959 105.801 94.6631 104.552 94.6195L93.9295 94.2486L94.0188 91.6901L104.744 92.0647ZM122.884 98.436C130.887 98.7155 134.425 96.5644 134.6 91.5703C134.774 86.5763 131.394 84.1836 123.392 83.9041C115.389 83.6246 111.85 85.7757 111.676 90.7698C111.502 95.7639 114.881 98.1566 122.884 98.436ZM123.009 94.8747C117.4 94.6789 115.737 93.6166 115.831 90.9149C115.925 88.2132 117.659 87.2696 123.267 87.4655C128.855 87.6606 130.457 88.7207 130.363 91.4224C130.269 94.1241 128.596 95.0698 123.009 94.8747Z"
            fill="#FEFEFE"
          />
          <path
            d="M34.8929 85.5064L34.6023 86.753L35.8293 87.039L36.1347 85.8166L34.8929 85.5064ZM35.7505 82.0732L36.9923 82.3834L37.2975 81.1617L36.081 80.8366L35.7505 82.0732ZM35.3266 94.2104L35.5701 95.467L36.8063 95.2275L36.5871 93.9876L35.3266 94.2104ZM34.7106 90.7257L35.971 90.5028L35.7517 89.2621L34.5077 89.4618L34.7106 90.7257ZM20.6283 87.6109C20.6468 87.0813 20.7271 86.7376 20.8385 86.5039C20.9371 86.2971 21.0842 86.1228 21.3612 85.9649C22.0117 85.594 23.322 85.338 25.9403 85.4295L26.0297 82.871C23.3879 82.7788 21.4238 82.9823 20.0932 83.741C19.3796 84.1479 18.8595 84.706 18.5276 85.4025C18.2085 86.072 18.095 86.8026 18.0699 87.5215L20.6283 87.6109ZM25.9403 85.4295C29.023 85.5371 32.2384 86.202 34.6023 86.753L35.1834 84.2599C32.7908 83.7021 29.3738 82.9878 26.0297 82.871L25.9403 85.4295ZM36.1347 85.8166L36.9923 82.3834L34.5086 81.7629L33.651 85.1962L36.1347 85.8166ZM36.081 80.8366C33.1796 80.0611 29.4981 79.4265 26.0108 79.3047L25.9214 81.8631C29.1884 81.9772 32.6771 82.5766 35.42 83.3097L36.081 80.8366ZM26.0108 79.3047C22.0925 79.1678 19.1082 79.6991 17.0553 81.0833C14.9074 82.5316 14.0067 84.7493 13.915 87.3764L16.4734 87.4658C16.5453 85.4058 17.2032 84.0712 18.4865 83.2059C19.865 82.2764 22.1849 81.7326 25.9214 81.8631L26.0108 79.3047ZM13.915 87.3764C13.8232 90.0031 14.5665 92.2822 16.6063 93.8819C18.5574 95.412 21.4975 96.1558 25.4175 96.2927L25.5069 93.7343C21.772 93.6039 19.4963 92.895 18.1861 91.8675C16.9648 90.9096 16.4015 89.5261 16.4734 87.4658L13.915 87.3764ZM25.4175 96.2927C28.9048 96.4145 32.6217 96.0382 35.5701 95.467L35.0832 92.9538C32.2958 93.4938 28.7738 93.8484 25.5069 93.7343L25.4175 96.2927ZM36.5871 93.9876L35.971 90.5028L33.4501 90.9485L34.0662 94.4332L36.5871 93.9876ZM34.5077 89.4618C32.1111 89.8466 28.8571 90.2856 25.7745 90.1779L25.6852 92.7364C29.0293 92.8532 32.4878 92.3789 34.9135 91.9895L34.5077 89.4618ZM25.7745 90.1779C23.1556 90.0865 21.868 89.7396 21.246 89.3232C20.9814 89.1461 20.8461 88.9609 20.7614 88.7443C20.6658 88.4998 20.6096 88.1466 20.6283 87.6109L18.0699 87.5215C18.0446 88.2445 18.1065 88.9841 18.3771 89.6764C18.6588 90.3968 19.1378 90.9925 19.8219 91.4505C21.0972 92.3043 23.0439 92.6441 25.6852 92.7364L25.7745 90.1779ZM47.4854 97.0838C51.5553 97.226 54.7454 96.7691 56.9749 95.4512C59.3293 94.0595 60.4256 91.8267 60.5249 88.9836L57.9664 88.8942C57.8913 91.0452 57.1313 92.385 55.6722 93.2475C54.0882 94.1838 51.5077 94.6627 47.5748 94.5254L47.4854 97.0838ZM60.5249 88.9836C60.6242 86.1405 59.6863 83.8366 57.4347 82.284C55.3026 80.8139 52.1521 80.1356 48.0822 79.9935L47.9929 82.5519C51.9258 82.6892 54.4666 83.347 55.9814 84.3916C57.3768 85.3537 58.0415 86.7433 57.9664 88.8942L60.5249 88.9836ZM48.0822 79.9935C44.0124 79.8513 40.8223 80.3082 38.5928 81.6261C36.2384 83.0178 35.1421 85.2506 35.0428 88.0937L37.6012 88.1831C37.6764 86.0321 38.4364 84.6923 39.8955 83.8298C41.4795 82.8935 44.06 82.4146 47.9929 82.5519L48.0822 79.9935ZM35.0428 88.0937C34.9435 90.9368 35.8814 93.2407 38.133 94.7933C40.2651 96.2634 43.4156 96.9417 47.4854 97.0838L47.5748 94.5254C43.6418 94.3881 41.1011 93.7303 39.5862 92.6857C38.1909 91.7236 37.5261 90.334 37.6012 88.1831L35.0428 88.0937ZM47.6991 90.9641C44.8951 90.8661 43.3653 90.5478 42.5595 90.0901C42.2027 89.8875 42.0279 89.6784 41.9251 89.4631C41.8126 89.2272 41.737 88.8779 41.7562 88.3282L39.1977 88.2388C39.1697 89.0399 39.2667 89.8365 39.6148 90.5658C39.9727 91.3157 40.5467 91.891 41.2951 92.3161C42.6996 93.1138 44.8057 93.4246 47.6098 93.5225L47.6991 90.9641ZM41.7562 88.3282C41.7754 87.7784 41.8751 87.4352 42.0039 87.2078C42.1214 87.0002 42.3104 86.8038 42.6804 86.6265C43.5163 86.2261 45.0645 86.0153 47.8685 86.1133L47.9579 83.5548C45.1538 83.4569 43.0311 83.62 41.5744 84.3178C40.7982 84.6897 40.1855 85.2235 39.7761 85.9466C39.378 86.6498 39.2257 87.4377 39.1977 88.2388L41.7562 88.3282ZM47.8685 86.1133C50.6641 86.2109 52.168 86.5289 52.9522 86.9813C53.2967 87.18 53.4651 87.385 53.5651 87.6C53.6756 87.8377 53.7491 88.1906 53.7297 88.7463L56.2881 88.8356C56.3159 88.0404 56.2244 87.2477 55.8864 86.5207C55.5379 85.771 54.9742 85.1922 54.2313 84.7637C52.8411 83.9618 50.75 83.6523 47.9579 83.5548L47.8685 86.1133ZM53.7297 88.7463C53.7103 89.302 53.6123 89.6489 53.4855 89.8783C53.3708 90.0858 53.1884 90.2786 52.831 90.4527C52.0171 90.8493 50.4947 91.0617 47.6991 90.9641L47.6098 93.5225C50.4019 93.62 52.5095 93.4571 53.9523 92.7541C54.7232 92.3785 55.3259 91.8405 55.7259 91.1169C56.1138 90.4152 56.2603 89.6308 56.2881 88.8356L53.7297 88.7463ZM64.9677 96.1267L64.9231 97.4059L66.2023 97.4506L66.247 96.1713L64.9677 96.1267ZM65.2829 87.1005L66.3159 86.3446L64.1327 83.3614L64.0037 87.0558L65.2829 87.1005ZM72.07 96.3747L71.037 97.1306L71.4041 97.6322L72.0253 97.6539L72.07 96.3747ZM76.2658 96.5212L76.2211 97.8004L76.8423 97.8221L77.2435 97.3473L76.2658 96.5212ZM83.6832 87.743L84.9625 87.7877L85.0915 84.0933L82.7055 86.9169L83.6832 87.743ZM83.368 96.7692L82.0888 96.7245L82.0441 98.0038L83.3234 98.0484L83.368 96.7692ZM87.5229 96.9143L87.4783 98.1935L88.7575 98.2382L88.8022 96.959L87.5229 96.9143ZM88.0104 82.9555L89.2896 83.0001L89.3343 81.7209L88.0551 81.6762L88.0104 82.9555ZM83.0368 82.7818L83.0815 81.5026L82.4619 81.4809L82.0609 81.9536L83.0368 82.7818ZM74.3384 93.0317L73.308 93.791L74.2677 95.0933L75.3144 93.8599L74.3384 93.0317ZM66.3558 82.1993L67.3862 81.4399L67.019 80.9416L66.4004 80.92L66.3558 82.1993ZM61.3003 82.0227L61.3449 80.7435L60.0657 80.6988L60.0211 81.978L61.3003 82.0227ZM60.8128 95.9816L59.5336 95.9369L59.4889 97.2161L60.7682 97.2608L60.8128 95.9816ZM66.247 96.1713L66.5622 87.1452L64.0037 87.0558L63.6885 96.082L66.247 96.1713ZM64.25 87.8564L71.037 97.1306L73.1029 95.6188L66.3159 86.3446L64.25 87.8564ZM72.0253 97.6539L76.2211 97.8004L76.3105 95.242L72.1146 95.0955L72.0253 97.6539ZM77.2435 97.3473L84.6609 88.5692L82.7055 86.9169L75.2881 95.6951L77.2435 97.3473ZM82.404 87.6984L82.0888 96.7245L84.6473 96.8139L84.9625 87.7877L82.404 87.6984ZM83.3234 98.0484L87.4783 98.1935L87.5676 95.6351L83.4127 95.49L83.3234 98.0484ZM88.8022 96.959L89.2896 83.0001L86.7312 82.9108L86.2437 96.8696L88.8022 96.959ZM88.0551 81.6762L83.0815 81.5026L82.9921 84.061L87.9657 84.2347L88.0551 81.6762ZM82.0609 81.9536L73.3625 92.2034L75.3144 93.8599L84.0127 83.61L82.0609 81.9536ZM75.3688 92.2723L67.3862 81.4399L65.3253 82.9586L73.308 93.791L75.3688 92.2723ZM66.4004 80.92L61.3449 80.7435L61.2556 83.3019L66.3111 83.4785L66.4004 80.92ZM60.0211 81.978L59.5336 95.9369L62.092 96.0262L62.5795 82.0674L60.0211 81.978ZM60.7682 97.2608L64.9231 97.4059L65.0124 94.8474L60.8575 94.7024L60.7682 97.2608ZM107.492 90.2548L107.209 89.0064L107.163 91.492L107.492 90.2548ZM90.2227 83.0327L90.2673 81.7535L88.9881 81.7088L88.9434 82.988L90.2227 83.0327ZM89.7352 96.9916L88.456 96.9469L88.4113 98.2261L89.6905 98.2708L89.7352 96.9916ZM94.121 88.7633L92.8418 88.7186L92.7971 89.9978L94.0764 90.0425L94.121 88.7633ZM94.2068 86.3072L94.2515 85.028L92.9723 84.9833L92.9276 86.2625L94.2068 86.3072ZM93.9295 94.2486L92.6503 94.2039L92.6056 95.4831L93.8848 95.5278L93.9295 94.2486ZM94.0188 91.6901L94.0635 90.4109L92.7843 90.3663L92.7396 91.6455L94.0188 91.6901ZM105.246 98.814C106.936 98.873 108.487 98.6545 109.652 97.8482C110.901 96.9831 111.454 95.6286 111.51 94.0223L108.951 93.933C108.914 94.9875 108.593 95.4672 108.194 95.7434C107.711 96.0783 106.838 96.308 105.335 96.2555L105.246 98.814ZM111.51 94.0223C111.553 92.7721 111.299 91.645 110.608 90.7365C109.92 89.8324 108.926 89.3111 107.82 89.0176L107.163 91.492C107.925 91.6942 108.337 91.9802 108.57 92.2865C108.8 92.5885 108.981 93.075 108.951 93.933L111.51 94.0223ZM107.774 91.5033C108.772 91.2776 109.656 90.8112 110.29 90.0181C110.919 89.2309 111.199 88.2515 111.236 87.1888L108.678 87.0994C108.654 87.7764 108.486 88.1749 108.29 88.4193C108.1 88.658 107.781 88.877 107.209 89.0064L107.774 91.5033ZM111.236 87.1888C111.288 85.7012 110.845 84.4033 109.751 83.5076C108.724 82.6678 107.32 82.349 105.802 82.296L105.713 84.8544C107 84.8994 107.737 85.1676 108.13 85.4891C108.454 85.7547 108.709 86.1922 108.678 87.0994L111.236 87.1888ZM105.802 82.296L90.2673 81.7535L90.178 84.3119L105.713 84.8544L105.802 82.296ZM88.9434 82.988L88.456 96.9469L91.0144 97.0362L91.5019 83.0774L88.9434 82.988ZM89.6905 98.2708L105.246 98.814L105.335 96.2555L89.7799 95.7123L89.6905 98.2708ZM104.437 87.9452C104.661 87.953 104.803 87.9766 104.886 87.999C104.968 88.0209 104.96 88.0327 104.917 87.9978C104.894 87.9798 104.869 87.9544 104.846 87.9223C104.823 87.8903 104.809 87.8606 104.801 87.8389C104.786 87.7987 104.8 87.8083 104.797 87.9066L107.355 87.9959C107.379 87.3132 107.197 86.5476 106.523 86.0047C105.935 85.5308 105.183 85.4097 104.526 85.3868L104.437 87.9452ZM104.797 87.9066C104.795 87.9688 104.784 87.9639 104.804 87.9239C104.827 87.8791 104.863 87.8411 104.894 87.8193C104.919 87.802 104.916 87.813 104.855 87.8264C104.793 87.84 104.691 87.8516 104.543 87.8464L104.453 90.4049C105.053 90.4258 105.756 90.3353 106.348 89.9264C107.006 89.4723 107.328 88.7667 107.355 87.9959L104.797 87.9066ZM104.543 87.8464L94.1657 87.4841L94.0764 90.0425L104.453 90.4049L104.543 87.8464ZM95.4002 88.808L95.486 86.3519L92.9276 86.2625L92.8418 88.7186L95.4002 88.808ZM94.1621 87.5864L104.437 87.9452L104.526 85.3868L94.2515 85.028L94.1621 87.5864ZM104.699 93.3439C104.907 93.3512 105.052 93.371 105.15 93.3943C105.247 93.4176 105.259 93.4357 105.233 93.4167C105.194 93.389 105.149 93.3382 105.125 93.2807C105.105 93.2348 105.123 93.2418 105.119 93.3483L107.678 93.4377C107.706 92.6252 107.435 91.8425 106.718 91.3315C106.113 90.9008 105.373 90.8059 104.788 90.7855L104.699 93.3439ZM105.119 93.3483C105.114 93.49 105.093 93.5114 105.111 93.4726C105.121 93.4503 105.14 93.4181 105.17 93.3841C105.2 93.3501 105.231 93.3259 105.256 93.3109C105.299 93.2841 105.292 93.3034 105.171 93.3217C105.05 93.34 104.868 93.3498 104.597 93.3403L104.507 95.8988C105.154 95.9213 105.952 95.8914 106.605 95.4865C107.402 94.9919 107.652 94.1803 107.678 93.4377L105.119 93.3483ZM104.597 93.3403L93.9742 92.9694L93.8848 95.5278L104.507 95.8988L104.597 93.3403ZM95.2087 94.2933L95.298 91.7348L92.7396 91.6455L92.6503 94.2039L95.2087 94.2933ZM93.9742 92.9694L104.699 93.3439L104.788 90.7855L94.0635 90.4109L93.9742 92.9694ZM122.84 99.7153C126.909 99.8574 130.099 99.4005 132.329 98.0827C134.683 96.6909 135.78 94.4581 135.879 91.615L133.321 91.5257C133.245 93.6766 132.485 95.0164 131.026 95.8789C129.442 96.8152 126.862 97.2942 122.929 97.1568L122.84 99.7153ZM135.879 91.615C135.978 88.7719 135.04 86.468 132.789 84.9155C130.657 83.4453 127.506 82.767 123.436 82.6249L123.347 85.1833C127.28 85.3207 129.821 85.9785 131.336 87.023C132.731 87.9852 133.396 89.3747 133.321 91.5257L135.879 91.615ZM123.436 82.6249C119.366 82.4828 116.176 82.9396 113.947 84.2575C111.592 85.6492 110.496 87.882 110.397 90.7251L112.955 90.8145C113.03 88.6635 113.79 87.3237 115.25 86.4613C116.834 85.5249 119.414 85.046 123.347 85.1833L123.436 82.6249ZM110.397 90.7251C110.298 93.5683 111.235 95.8721 113.487 97.4247C115.619 98.8949 118.77 99.5731 122.84 99.7153L122.929 97.1568C118.996 97.0195 116.455 96.3617 114.94 95.3171C113.545 94.355 112.88 92.9654 112.955 90.8145L110.397 90.7251ZM123.053 93.5955C120.249 93.4976 118.719 93.1793 117.914 92.7215C117.557 92.5189 117.382 92.3098 117.279 92.0945C117.167 91.8586 117.091 91.5094 117.11 90.9596L114.552 90.8702C114.524 91.6713 114.621 92.468 114.969 93.1972C115.327 93.9471 115.901 94.5224 116.649 94.9475C118.054 95.7452 120.16 96.056 122.964 96.1539L123.053 93.5955ZM117.11 90.9596C117.129 90.4098 117.229 90.0666 117.358 89.8392C117.475 89.6316 117.664 89.4352 118.035 89.258C118.87 88.8576 120.419 88.6468 123.223 88.7447L123.312 86.1862C120.508 86.0883 118.385 86.2514 116.928 86.9492C116.152 87.3211 115.54 87.8549 115.13 88.578C114.732 89.2812 114.58 90.0692 114.552 90.8702L117.11 90.9596ZM123.223 88.7447C126.018 88.8423 127.522 89.1604 128.306 89.6127C128.651 89.8114 128.819 90.0164 128.919 90.2314C129.03 90.4691 129.103 90.822 129.084 91.3777L131.642 91.467C131.67 90.6719 131.579 89.8791 131.241 89.1521C130.892 88.4024 130.328 87.8236 129.585 87.3952C128.195 86.5933 126.104 86.2837 123.312 86.1862L123.223 88.7447ZM129.084 91.3777C129.064 91.9334 128.966 92.2803 128.84 92.5097C128.725 92.7172 128.543 92.91 128.185 93.0842C127.371 93.4807 125.849 93.6931 123.053 93.5955L122.964 96.1539C125.756 96.2514 127.864 96.0885 129.306 95.3855C130.077 95.0099 130.68 94.4719 131.08 93.7483C131.468 93.0467 131.614 92.2622 131.642 91.467L129.084 91.3777Z"
            fill="#151515"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1321_6040"
            x="0.159999"
            y="-1.68"
            width="163.85"
            height="124.306"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="6.4" dy="2.56" />
            <feGaussianBlur stdDeviation="5.12" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0 0.0823529 0 0 0 0.16 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1321_6040"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1321_6040"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <span class="battle-comboMultiplicator" ref="comboMultiplicator"></span>
    </div>

    <BattleResponse
      class="opponent responseContainer--opponent"
      ref="opponent"
    ></BattleResponse>
    <BattleResponse
      class="player responseContainer--player"
      ref="player"
    ></BattleResponse>

    <BattleMultipleResponse ref="globalResponse"></BattleMultipleResponse>

    <CustomButton
      class="chat-button medium btn-battle"
      @click.native="nextPunchRound1()"
      :text="'suivant'"
    />

    <ChatComponent
      v-if="this.chatDisplay && currentChat"
      :content="currentChat"
    />
    <Onboarding :content="currentOnboarding"></Onboarding>
  </section>
</template>

<script lang="ts">
import { Vue, Component, getModule, Watch } from "nuxt-property-decorator";
import stepStore from "~/store/stepStore";
import CustomButton from "~/components/buttons/button.vue";
import BattleResponse from "~/components/battle/battleResponse.vue";
import BattleMultipleResponse from "~/components/battle/battleMultipleResponse.vue";
import ChatComponent from "~/components/contentOverlays/chat.vue";
import chatStore from "~/store/chatStore";
import battleStore from "../../store/battleStore";
import Onboarding from "../../components/contentOverlays/onboarding";
import onboardingStore from "../../store/onboardingStore";
import $socket from "~/plugins/socket.io";

import { AssetsManager } from "~/core/managers";
import { gsap } from "gsap";
import { Punchline } from "../../core/types/punchline";
import BattleSceneInitializer from "../../core/utils/initializers/BattleSceneInitializer";
import grenierScene from "../../core/scene/GrenierScene";
import BattleScene from "../../core/scene/BattleScene";
import HoodScene from "../../core/scene/HoodScene";
import emitter from "tiny-emitter/instance";
import { VIDEO_ASSET } from "../../core/enums";
import { Npc } from "../../core/models/npc";
import { ignoreNgOnChanges } from "swiper/angular/angular/src/utils/utils";
@Component({
  components: {
    CustomButton,
    ChatComponent,
    Onboarding,
    BattleResponse,
    BattleMultipleResponse,
  },
  async asyncData({ $prismic, error }) {
    try {
      const battleContent = (await $prismic.api.getSingle("battle")).data;

      const battleChat = battleContent?.slices1;
      const battleOnboarding = battleContent?.slices2[0].items;
      const battlePunchRound1 = battleContent?.slices3[0].items;

      const round2Step1 = battleContent?.slices6[0].items;
      const round2Step2 = battleContent?.slices7[0].items;
      const round2Step3 = battleContent?.slices8[0].items;
      const round2Step4 = battleContent?.slices9[0].items;

      const opponentRound1 = battleContent?.slices10[0].items;
      const opponentRound2 = battleContent?.slices11[0].items;

      const resultBattle = battleContent?.slices12;

      const currentChat = battleChat[0];
      const currentOnboarding = battleOnboarding[0];
      const currentPunchline = battlePunchRound1;

      return {
        battleChat,
        battleOnboarding,
        currentChat,
        currentOnboarding,
        currentPunchline,
        round2Step1,
        round2Step2,
        round2Step3,
        round2Step4,
        opponentRound1,
        opponentRound2,
        resultBattle,
      };
    } catch (e) {
      // Returns error page
      //   error({ statusCode: 404, message: 'Content not found' })
    }
  },
})
export default class battle extends Vue {
  public stepStore = getModule(stepStore, this.$store);
  public battleStore = getModule(battleStore, this.$store);
  public chatStore = getModule(chatStore, this.$store);
  public onboardingStore = getModule(onboardingStore, this.$store);
  public battleChat: any;
  public battleOnboarding: any;
  public currentChat: object;
  public currentOnboarding: object;
  public currentPunchline: object;
  public chatCounter: number = 0;
  public opponentTourRound1: boolean = true;
  public punchlineArray: string[] = [];
  public punchArray: Array<Punchline> = [];
  public opponent: HTMLElement;
  public player: HTMLElement;
  public globalResponse: HTMLElement;
  public isRound2: boolean = false;
  public round2Step1: object;
  public round2Step2: object;
  public round2Step3: object;
  public round2Step4: object;
  public round2StepCounter: number = -1;
  public opponentRound1: object;
  public opponentRound2: object;
  public resultBattle: object;
  public pp: HTMLImageElement | null = null;
  public score: { player: number; opponent: number } = {
    player: 200,
    opponent: 200,
  };
  public comboValue: number = 0;
  public damage: number;
  public damageElement: HTMLElement;
  public comboMultiplicator: HTMLElement;
  public transitionRound1: HTMLMediaElement;
  public transitionRound2: HTMLMediaElement;
  public playerAndOpponentActive: boolean = false;
  public npcs: Array<Npc> = [];
  public battleSceneInitializer: BattleSceneInitializer;
  public videoLooseElement: HTMLMediaElement;
  public videoVictoryElement: HTMLMediaElement;
  mounted() {
    this.initRound2Datas();
    this.player = this.$refs.player as HTMLElement;
    this.opponent = this.$refs.opponent as HTMLElement;
    this.globalResponse = this.$refs.globalResponse as HTMLElement;
    this.damageElement = this.$refs.damage as HTMLElement;
    this.comboMultiplicator = this.$refs.comboMultiplicator as HTMLElement;
    this.transitionRound1 = this.$refs.transitionRound1 as HTMLMediaElement;
    this.transitionRound2 = this.$refs.transitionRound2 as HTMLMediaElement;
    this.videoLooseElement = this.$refs.videoLoose as HTMLMediaElement;
    this.videoVictoryElement = this.$refs.videoVictory as HTMLMediaElement;

    new BattleSceneInitializer({
      canvas: this.$refs.battleScene as HTMLCanvasElement,
      battleStore: this.battleStore,
    }).init();
    BattleScene.context.disableOrbitControl();

    emitter.on("battle::initNpcs", (npcs: Array<Npc>) => {
      this.npcs = npcs;
      console.log(npcs, "AOOOO");
    });

    console.log("OUAIS MA GUEULE");

    console.log("BATTLE");

    // Listening for a battle response from the server.
    $socket.io.on("battle::response", (ids) => {
      this.pp = AssetsManager.getImage("PP").data;

      // emitter.emit('battle::disposeObject','coach')

      this.hideOnboarding();
      if (!ids) {
        this.punchArray.push({
          id: -1,
          text: "...",
          score: 0,
          status: "nul",
        });
      } else {
        console.log(ids, "ID EST GOOD");
        ids.forEach((id) => {
          if (this.isRound2) {
            console.log("ROUND 2💩💩");
            this.punchArray = [];

            this.punchArray.push({
              id: id,
              text: this.battleStore.round2Datas[this.round2StepCounter][id]
                .content[0].text,
              score: parseInt(
                this.battleStore.round2Datas[this.round2StepCounter][id].score
              ),
              status: this.battleStore.round2Datas[this.round2StepCounter][id]
                .status,
            });

            console.log(this.punchArray, "<------- PUNCH R2");
            console.log(this.battleStore.round2Datas);
          } else {
            this.punchArray.push({
              id: id,
              text: this.currentPunchline[id].content[0].text,
              score: parseInt(this.currentPunchline[id].score),
              status: this.currentPunchline[id].status,
            });

            console.log(this.punchArray, "🚨🚨🚨🚨🚨🚨");
          }
        });
      }

      this.displayOpponentPunchline();

      this.isRound2 = true;
      if (this.isRound2) {
        this.round2StepCounter++;
      }
    });

    $socket.io.on("battle::round1DisposeObject", () => {
      emitter.emit("battle::disposeObject", "coach");
    });

    $socket.io.on("battle::mobileToAddObject", () => {
      emitter.emit("battle::addObject", "player");
      emitter.emit("battle::addObject", "opponent");
      this.toggleRapperAnimation("player", "idle");
      this.toggleRapperAnimation("opponent", "idle");

      emitter.emit("battle::disposeObject", "coach");
    });
  }

  // show opponent punchlines
  displayOpponentPunchline() {
    console.log(this.opponent);
    if (!this.isRound2) {
      emitter.emit("battle::addObject", "opponent");
      this.animatePunchline(
        this.opponent.$el.children,
        true,
        this.opponentRound1,
        null,
        true
      );
    } else {
      this.toggleRapperAnimation("player", "idle");
      this.toggleRapperAnimation("opponent", "rap");
      this.animatePunchline(
        this.globalResponse.$el.children,
        false,
        this.opponentRound2,
        null,
        true,
        this.round2StepCounter
      );
    }
  }

  /**
   * Calculate Score
   * @param target
   * @param damageVal
   * @param isOpponent
   */
  calculateScore(target: number, damageVal: number, isOpponent: boolean) {
    this.damage = damageVal;
    target = target - damageVal;
    if (isOpponent) {
      console.log(target, damageVal, "<-- score value");
      console.log(target);
      this.score.opponent = target;
      this.$refs.damage.classList.remove("battle-damageOpponent");
      gsap.to(this.$refs.opponentGauge, { width: `${target}px`, duration: 1 });
    } else {
      this.score.player = target;
      this.$refs.damage.classList.add("battle-damageOpponent");
      gsap.to(this.$refs.playerGauge, { width: `${target}px`, duration: 1 });
    }
    let tl = gsap.timeline();
    this.$refs.damage.innerHTML = -damageVal;
    tl.to(this.$refs.damage, {
      display: "block",
      opacity: 1,
      y: -5,
      duration: 0.5,
      ease: "expo.out",
    });
    tl.to(this.$refs.damage, {
      display: "none",
      opacity: 0,
      y: 0,
      duration: 0.5,
      ease: "expo.out",
      onComplete: () => {
        if (
          this.$refs.damage.classList.contains(
            "battle-damageOpponent" && !isOpponent
          )
        ) {
          this.$refs.damage.classList.remove("battle-damageOpponent");
        }
      },
    });
  }

  // A function that is called when a punchline is clicked. It checks if the punchline is a top punchline. If it is, it
  // increments the comboValue by 1. If it is not, it sets the comboValue to 0.
  public detectCombo(punchline: Punchline) {
    if (punchline.status === "top") {
      console.log("🚑️🚑️🚑️top🚑️🚑️🚑️");
      this.comboValue++;
      if (this.comboValue >= 2) {
        gsap.to(".battle-combo", { display: "block", opacity: 1 });
        this.comboMultiplicator.innerHTML = `x${this.comboValue}`;
        gsap.to(".battle-comboMultiplicator", { display: "block", opacity: 1 });
      }
      console.log(this.comboValue, "<----- COMBOO");
    } else {
      gsap.to(".battle-combo", { display: "none", opacity: 0 });
      this.comboMultiplicator.innerHTML = `x${this.comboValue}`;
      gsap.to(".battle-comboMultiplicator", { display: "none", opacity: 0 });
      this.comboValue = 0;
    }
  }

  // Show user punchline
  displayUserPunchline() {
    gsap.set(Array.from(this.player.$el.children), {
      display: "none",
      opacity: 0,
    });
    console.log(this.round2StepCounter, "<---est ceque leround 2");
    if (this.round2StepCounter == 0) {
      this.animatePunchline(
        this.player.$el.children,
        true,
        null,
        this.punchArray,
        false
      );
    } else {
      // emitter.emit('battle::addObject','player')
      this.toggleRapperAnimation("player", "rap");
      this.toggleRapperAnimation("opponent", "idle");
      this.animatePunchline(
        this.globalResponse.$el.children,
        false,
        null,
        this.punchArray,
        false,
        this.round2StepCounter - 1
      );
    }
  }

  /**
   *  Animate Punchline
   *
   * @param target
   * @param round1
   * @param opponentData
   * @param playerData
   * @param isOpponentTour
   * @param punchIndex
   */
  animatePunchline(
    target: NodeList | HTMLCollection,
    round1: boolean = true,
    opponentData?: object,
    playerData?: Array<Punchline>,
    isOpponentTour: boolean = true,
    punchIndex?: number
  ) {
    /**
     * 🚨🚨🚨 ROUND 1 🚨🚨🚨
     */
    if (round1) {
      Array.from(target).forEach((el: HTMLElement, index: number) => {
        el.innerHTML = isOpponentTour
          ? opponentData[index].content[0].text
          : playerData[!isOpponentTour && !round1 ? punchIndex : index].text;

        gsap.to(el, {
          display: "block",
          duration: 2,
          opacity: 1,
          ease: "expo.out",
          delay: index * 2,
          onComplete: () => {
            console.log(this.punchArray[index], "INDEX DU PUNCH ARRAY");
            if (!isOpponentTour) {
              this.detectCombo(
                playerData[!isOpponentTour && !round1 ? 0 : index]
              );
              this.calculateScore(
                this.score.opponent,
                playerData[!isOpponentTour && !round1 ? 0 : index].score,
                true
              );

              if (index === 3) {
                if (this.round2StepCounter <= 0) {
                  gsap.to(".btn-battle", { display: "block", opacity: 1 });
                  // this.nextPunchRound1(false)
                  // this.setNextChat();
                  // this.displayChat();
                  // gsap.to('.responseContainer--player span',{display:'none',opacity:0})
                } else {
                  this.displayOnboarding();
                  $socket.io.emit("battle::round2Sequence");
                  this.comboValue = 0;
                }
              }
            } else {
              this.calculateScore(
                this.score.player,
                opponentData[index].score,
                false
              );
              if (index === 3) {
                gsap.to(".btn-battle", { display: "block", opacity: 1 });
                // this.nextPunchRound1(true)
                // this.displayUserPunchline();
                // gsap.to('.responseContainer--opponent span',{display:'none',opacity:0})
              }
            }
          },
        });
      });
    } else {
      /**
       * 🚨🚨🚨 ROUND 2 🚨🚨🚨
       */

      const result = isOpponentTour
        ? [...target].filter((element) =>
            element.classList.contains("battleResponse--opponent")
          )
        : [...target].filter((element) =>
            element.classList.contains("battleResponse--player")
          );

      console.log(result, "✅✅✅✅✅");
      let currentElement = result[punchIndex] as HTMLElement;
      currentElement.innerHTML = isOpponentTour
        ? opponentData[punchIndex].content[0].text
        : playerData[0].text;
      gsap.to(currentElement, {
        display: "block",
        duration: 2,
        opacity: 1,
        ease: "expo.out",
        delay: 2,
        onComplete: () => {
          gsap.to(currentElement, { opacity: 0.5 });
          if (!isOpponentTour) {
            this.detectCombo(
              playerData[!isOpponentTour && !round1 ? 0 : punchIndex]
            );
            this.calculateScore(
              this.score.opponent,
              playerData[!isOpponentTour && !round1 ? 0 : punchIndex].score,
              true
            );
            if (punchIndex == 1) {
              gsap.to(".battleResponse--group", {
                display: "none",
                opacity: 0,
              });
            }
            if (punchIndex === 3) {
              console.log("FINNNNNNNNNNN");
              this.showWinner();
            }
            $socket.io.emit("battle::round2Sequence");
          } else {
            this.calculateScore(
              this.score.player,
              opponentData[punchIndex].score,
              false
            );
            this.displayUserPunchline();
          }
        },
      });
    }
  }

  nextPunchRound1(): void {
    if (this.opponentTourRound1) {
      gsap.to(".responseContainer--opponent span", {
        display: "none",
        duration: 1,
        opacity: 0,
        onComplete: () => {
          this.displayUserPunchline();
          this.opponentTourRound1 = false;
          emitter.emit("battle::disposeObject", "opponent");
          emitter.emit("battle::addObject", "player");
        },
      });
    } else {
      gsap.to(".responseContainer--player span", {
        display: "none",
        duration: 1,
        opacity: 0,
        onComplete: () => {
          this.setNextChat();
          this.displayChat();
          emitter.emit("battle::disposeObject", "player");
          emitter.emit("battle::addObject", "coach");
          console.log(
            BattleScene.context.scene,
            "<--- maj de la scene du battle "
          );
        },
      });
    }
    gsap.to(".btn-battle", { display: "none", opacity: 0 });
  }

  toggleRapperAnimation(npcName: string, animationName: string): void {
    this.npcs.forEach((el: Npc) => {
      if (el.name === npcName) {
        el.animationPlayed = animationName;
      }
    });
  }

  showWinner() {
    console.log(this.resultBattle);
    console.log(this.score.player, "<-- score player");
    console.log(this.score.opponent, "<-- score opponent");
    $socket.io.emit("goTo", {
      path: "/_mobile/off",
      replace: true,
    });
    if (this.score.player >= this.score.opponent) {
      this.videoVictoryElement.play();
      this.videoVictoryElement.loop = true;
      gsap.to(this.videoVictoryElement, { opacity: 1, display: "block" });
      this.currentOnboarding = this.resultBattle[0].items[0];
      this.displayOnboarding();
    } else {
      console.log("DEFAITE");
      this.videoLooseElement.play();
      this.videoLooseElement.loop = true;
      gsap.to(this.videoLooseElement, { opacity: 1, display: "block" });
      this.currentOnboarding = this.resultBattle[1].items[0];
      this.displayOnboarding();
    }
    BattleScene.context.destroy();
    gsap.set(this.$refs.battleScene, { display: "none" });
  }

  // Setting the isChatDisplay property to true.
  displayChat() {
    this.battleStore.setIsChatDisplay(true);
  }

  // Setting the value of the isChatDisplay property to false.
  closeChat() {
    this.battleStore.setIsChatDisplay(false);
  }

  // Setting the next chat in the battleChat array to the currentChat variable.
  setNextChat() {
    this.chatCounter++;
    this.currentChat = this.battleChat[this.chatCounter];
  }

  // Setting the onboardingDisplay to false.
  hideOnboarding() {
    this.onboardingStore.setOnboardingDisplay(false);
  }

  // Setting the onboarding display to true.
  displayOnboarding() {
    this.onboardingStore.setOnboardingDisplay(true);
  }

  // Emitting a socket event to the server.
  goToRound2() {
    console.log("ROUUUUUUUUUUUUUUUND 2");
    this.displayRoundTransition(false);
    this.hideRoundTransition(false);
    $socket.io.emit("battle::round2");
  }

  updateHealthGauges() {
    this.score = {
      player: 30,
      opponent: 80,
    };
    gsap.to(this.$refs.opponentGauge!, {
      width: (this.score.opponent / 200) * 100 + "%",
    });
    gsap.to(this.$refs.playerGauge!, {
      width: (this.score.opponent / 200) * 100 + "%",
    });
  }

  // watch dialogStep change in chatStore store
  @Watch("chatStep", { immediate: true, deep: true })
  setChatStep(val: string) {
    if (val) {
      console.log(val);

      switch (val) {
        case "reading":
          break;
        case "next":
          this.setNextChat();
          this.chatStore.setChatStep("reading");
          break;

        case "round1Transition":
          this.displayRoundTransition(true);
          this.hideRoundTransition(true);
          break;
        case "nextRound":
          this.closeChat();
          this.goToRound2();
          this.chatStore.setChatStep("reading");
          break;
      }
    }
  }

  displayRoundTransition(isRound1: boolean = true): void {
    isRound1
      ? gsap.set(this.$refs.transitionRound1, { display: "block" })
      : gsap.set(this.$refs.transitionRound2, { display: "block" });
    gsap.fromTo(
      ".battle-overlay",
      { display: "none", yPercent: 100 },
      {
        display: "block",
        duration: 1.5,
        yPercent: 0,
        ease: "expo.inOut",
        onComplete: () => {
          if (isRound1) {
            this.$refs.transitionRound1.play();
          } else {
            this.$refs.transitionRound2.play();
          }
        },
      }
    );
  }

  hideRoundTransition(isRound1: boolean = true): void {
    if (isRound1) {
      this.$refs.transitionRound1.onended = () => {
        gsap.to(".battle-overlay", {
          opacity: 0,
          display: "none",
          ease: "expo.inOut",
          duration: 1,
          onStart: () => {
            this.closeChat();
            this.displayOnboarding();
            this.chatStore.setChatStep("reading");
          },
          onComplete: () => {
            gsap.set(".battle-overlay", { opacity: 1, yPercent: 100 });
            gsap.set(this.$refs.transitionRound1, { display: "none" });
            $socket.io.emit("goTo", {
              path: "/_mobile/battle/round1",
              replace: true,
            });
          },
        });
      };
    } else {
      this.$refs.transitionRound2.onended = () => {
        gsap.to(".battle-overlay", {
          opacity: 0,
          display: "none",
          ease: "expo.inOut",
          duration: 1,
          onStart: () => {
            this.displayOnboarding();
            this.chatStore.setChatStep("reading");
          },
          onComplete: () => {
            gsap.set(this.$refs.transitionRound2, { display: "none" });
          },
        });
      };
    }
  }

  // watch dialogStep change in chatStore store
  @Watch("onboardingStep", { immediate: true, deep: true })
  setOnboardingStep(val: string) {
    if (val) {
      console.log(val);
      switch (val) {
        case "reading":
          break;
        case "goToHood":
          // this.setNextChat();
          this.goToHood();
          this.onboardingStore.setOnboardingStep("reading");
          break;
      }
    }
  }

  // Setting the round2Datas array in the battleStore to the array of round2Steps.
  initRound2Datas() {
    this.battleStore.setRound2Datas([
      this.round2Step1,
      this.round2Step2,
      this.round2Step3,
      this.round2Step4,
    ]);
  }

  goToHood() {
    // remove scene children
    this.$router.push("/hood3");
    console.log("ON VA DANS LE HOOD BB");
  }

  // A getter function that returns the src of the video.
  get videoVictory(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.BATTLE_END_BG_VICTORY).data.src;
  }
  // A getter function that returns the src of the video.
  get videoLoose(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.BATTLE_END_BG_DEFEAT).data.src;
  }
  // A getter function that returns the src of the video.
  get TransitionRound2(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.TRANSITION_ROUND_2).data.src;
  }
  // A getter function that returns the src of the video.
  get TransitionRound1(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.TRANSITION_ROUND_1).data.src;
  }
  // Getting the video source from the AssetsManager.
  get bgVideo(): string {
    return AssetsManager.getVideo(VIDEO_ASSET.BATTLE_VIDEO_BACKGROUND).data.src;
  }
  // A getter function that returns the chatStep property of the chatStore object.
  get chatStep() {
    return this.chatStore.chatStep;
  }

  // A getter function that returns the value of the isChatDisplay property of the battleStore object.
  get chatDisplay() {
    return this.battleStore.isChatDisplay;
  }

  // A getter function that returns the onboardingStep property of the onboardingStore object.
  get onboardingStep() {
    return this.onboardingStore.onboardingStep;
  }
}
</script>
