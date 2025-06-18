document.addEventListener('DOMContentLoaded', function () {
  const pathname = window.location.pathname;
  let storageKey = null;
  if (window.location.pathname.includes("step2")) {
    localStorage.removeItem("goal"); // 목표 설정 초기화
  }
  if (pathname.includes("step4")) {
    storageKey = "step4Cart";
    localStorage.removeItem(storageKey);  // ✅ step4 페이지에서 초기화
  } else if (pathname.includes("step5")) {
    storageKey = "step5Cart";
    localStorage.removeItem(storageKey);  // ✅ step5 페이지에서 초기화
  }

  let cart = [];
  if (storageKey) {
    cart = JSON.parse(localStorage.getItem(storageKey) || "[]");
  }

  const cartTableBody = document.querySelector('#cart-table tbody');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const itemName = this.dataset.name;

      if (!cart.includes(itemName)) {
        cart.push(itemName);
        alert(`${itemName}이(가) 장바구니에 담겼습니다.`);
        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(cart));
        }
        if (cartTableBody) updateCartTable();
      } else {
        alert(`${itemName}은(는) 이미 장바구니에 있어요.`);
      }
    });
  });

  function updateCartTable() {
    cartTableBody.innerHTML = "";
    cart.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${index + 1}</td><td>${item}</td>`;
      cartTableBody.appendChild(row);
    });
  }

  if (cartTableBody) updateCartTable();
});


//루틴 선택

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.pathname.includes("step3")) {
    localStorage.removeItem("routine"); // 진입 시 초기화

    let selectedRoutine = "";

    // 루틴 필터 클릭 시 선택 저장
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        selectedRoutine = this.dataset.routine || this.textContent.trim();
        console.log("✅ 선택된 루틴:", selectedRoutine);
      });
    });

    // 운동 용품 보러가기 버튼 클릭 시 확인 알림
    const link = document.getElementById('to-equipment');
    if (link) {
      link.addEventListener('click', function (e) {
        if (!selectedRoutine) {
          alert("먼저 루틴을 선택해주세요!");
          e.preventDefault(); // 이동 막음
          return;
        }

        const confirmMsg = `${selectedRoutine}을(를) 선택하겠습니까?`;
        const ok = confirm(confirmMsg);
        if (!ok) {
          e.preventDefault(); // 이동 취소
        } else {
          localStorage.setItem("routine", JSON.stringify([selectedRoutine]));
 // 저장 후 이동
        }
      });
    }
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const goalDescriptions = {
    "벌크업": "근육량과 체중을 증가시키는 것을 목표로 하며, 고중량 운동과 고탄수 식단을 기반으로 합니다.",
    "컷팅": "체지방을 줄이면서 근육을 최대한 유지하는 것이 목표입니다. 고단백 저탄수 식단과 유산소 운동이 핵심입니다.",
    "린매스업": "체지방을 최소화하면서 근육을 증가시키는 전략입니다. 섬세한 식단과 중량 점진 루틴이 필요합니다."
  };

  const routineDetails = {
    "벌크업": {
      "루틴1": [
        "루틴 1: 5x5 파워빌딩 루틴 (주 3~4회)",
        "월: 스쿼트 (5세트 x 5회), 런지, 레그프레스",
        "수: 벤치프레스, 인클라인, 삼두",
        "금: 데드리프트, 로우, 이두",
        "TIP: 매주 중량 2.5~5kg 상승 목표"
      ],
      "루틴2": [
        "루틴 2: 브로 스플릿 (주 6회)",
        "월: 가슴 / 화: 등 / 수: 하체 / 목: 어깨 / 금: 팔 / 토: 복근 or 보완",
        "각 부위 집중 트레이닝, 고립근 위주",
        "일: 휴식"
      ],
      "루틴3": [
        "루틴 3: 고중량 3분할 루틴",
        "월/목: 가슴 + 삼두 / 화/금: 등 + 이두 / 수/토: 하체",
        "일: 휴식",
        "4세트 10회 반복 중심"
      ]
    },
    "컷팅": {
      "루틴1": [
        "루틴 1: HIIT + 분할 웨이트 (주 5회)",
        "월/수/금: 상체 웨이트 (가슴/등/어깨)",
        "화/목: HIIT 유산소 20분 + 복근 서킷",
        "토/일: 걷기 or 휴식",
        "TIP: 유산소는 공복이 효과적"
      ],
      "루틴2": [
        "루틴 2: 전신 서킷 루틴 (주 4~5회)",
        "스쿼트 → 푸쉬업 → 숄더프레스 → 레그컬 (연속 1세트)",
        "총 3~4라운드, 유산소 병행",
        "목/일: 휴식"
      ],
      "루틴3": [
        "루틴 3: 공복 유산소 + 분리 웨이트 (주 6회)",
        "아침: 공복 유산소 30분",
        "저녁: 월: 가슴/삼두 / 화: 등/이두 / 수~토: 보완",
        "TIP: BCAA 섭취 권장"
      ]
    },
    "린매스업": {
      "루틴1": [
        "루틴 1: 3분할 웨이트 (주 6회)",
        "월/목: 가슴 + 삼두",
        "화/금: 등 + 이두",
        "수/토: 하체 + 어깨",
        "일: 휴식"
      ],
      "루틴2": [
        "루틴 2: PPL 루틴 (Push/Pull/Legs)",
        "월: Push / 화: Pull / 수: Legs",
        "목: 휴식 / 금: Push / 토: Pull / 일: 휴식 or Legs",
        "근비대 + 밸런스에 적합"
      ],
      "루틴3": [
        "루틴 3: 상하체 분할 + 유산소 보완",
        "월/수/금: 상체 + 유산소 15분",
        "화/목/토: 하체 + 복근",
        "일: 휴식"
      ]
    }
  };

  const goal = localStorage.getItem("goal");
  const routineArr = JSON.parse(localStorage.getItem("routine") || "[]");
  const routine = routineArr[0];

  // 목표 출력
  if (goal) {
    document.getElementById("goal-name").textContent = goal;
    document.getElementById("goal-desc").textContent = goalDescriptions[goal] || "설명이 없습니다.";
  }

  // 루틴 출력
  if (goal && routine && routineDetails[goal] && routineDetails[goal][routine]) {
    document.getElementById("routine-name").textContent = routine;
    document.getElementById("routine-desc").innerHTML =
      routineDetails[goal][routine]
        .map((text, idx) => {
          if (idx === 0) return `<p class="fw-bold text-success mb-2">${text}</p>`;
          else if (text.startsWith("TIP")) return `<p class="text-muted fst-italic">💡 ${text}</p>`;
          else return `<p class="mb-1">• ${text}</p>`;
        })
        .join("");
  } else {
    document.getElementById("routine-name").textContent = "-";
    document.getElementById("routine-desc").textContent = "선택한 루틴 정보를 찾을 수 없습니다.";
  }
});

// ✅ contact.html에서 선택한 목표, 루틴, 운동용품, 보충제 정보를 카드에 표시하는 코드

document.addEventListener("DOMContentLoaded", function () {
  const routineDetails = {
    "벌크업": {
      "루틴1": [
        "5x5 파워빌딩 루틴 (주 3~4회<br/>)",
        "전신을 고중량으로 훈련하여 근육과 힘을 동시에 키우는 루틴이에요.<br/>",
        "월: 스쿼트 (5x5), 런지, 레그프레스<br/>",
        "수: 벤치프레스, 인클라인, 삼두<br/>",
        "금: 데드리프트, 로우, 이두<br/>",
        "TIP: 매주 중량 2.5~5kg 상승 목표"
      ],
      "루틴2": [
        "월: 가슴 / 화: 등 / 수: 하체 / 목: 어깨 / 금: 팔 / 토: 복근 or 보완<br/>",
        "하루에 한 부위씩 집중해서 운동하는 전통적인 보디빌딩 루틴입니다.<br/>",
        "월: 가슴 / 화: 등 / 수: 하체 / 목: 어깨 / 금: 팔 / 토: 복근 or 보완<br/>",
        "각 부위 집중 트레이닝, 고립근 위주<br/>",
        "일: 휴식"
      ],
      "루틴3": [
        "고중량 3분할 루틴",
        "3일에 걸쳐 전신을 나눠 고강도로 운동하는 루틴입니다.<br/>",
        "월/목: 가슴 + 삼두 / 화/금: 등 + 이두 / 수/토: 하체<br/>",
        "일: 휴식<br/>",
        "4세트 10회 반복 중심"
      ]
    },
    "컷팅": {
      "루틴1": [
        "HIIT + 분할 웨이트 (주 5회)<br/>",
        "고강도 유산소와 웨이트를 함께하는 지방 연소 중심 루틴이에요.<br/>",
        "월/수/금: 상체 웨이트 (가슴/등/어깨)<br/>",
        "화/목: HIIT 유산소 20분 + 복근<br/>",
        "토/일: 걷기 or 휴식<br/>",
        "TIP: 유산소는 공복이 효과적<br/>"
      ],
      "루틴2":[
        "전신 서킷 루틴 (주 4~5회)<br/>",
        "여러 동작을 연속으로 수행해 체지방을 빠르게 태우는 루틴입니다.<br/>",
        "스쿼트 → 푸쉬업 → 숄더프레스 → 레그컬 (1세트)<br/>",
        "총 3~4라운드, 유산소 병행<br/>",
        "목/일: 휴식"
      ],

      "루틴3": [
        "공복 유산소 + 분할 웨이트 (주 6회)<br/>",
        "공복 유산소와 저녁 웨이트 병행으로 감량 효과를 극대화합니다.<br/>",
        "아침: 공복 유산소 30분<br/>",
        "저녁: 월: 가슴/삼두, 화: 등/이두, 수~토: 보완<br/>",
        "TIP: BCAA 병행 추천"
      ]
    },
    "린매스업": {
      "루틴1": [
        "3분할 웨이트 (주 6회)<br/>",
        "상체/하체를 나눠 체계적으로 운동하는 근육 증강 루틴이에요.<br/>",
        "월/목: 가슴 + 삼두<br/>",
        "화/금: 등 + 이두<br/>",
        "수/토: 하체 + 어깨<br/>",
        "일: 휴식<br/>"
      ],
      "루틴2": [
        "PPL 루틴 (Push/Pull/Legs)<br/>",
        "밀기/당기기/하체 순으로 부위별 나눠 훈련하는 체계적인 루틴입니다.<br/>",
        "월: Push / 화: Pull / 수: Legs<br/>",
        "목: 휴식 / 금: Push / 토: Pull / 일: 휴식 or Legs<br/>",
        "근비대 + 밸런스에 적합",
      ],
      "루틴3": [
        "상하체 분할 + 유산소 보완<br/>",
        "상하체를 나눠 운동하고 유산소도 함께하여 체지방 관리에 적합합니다.<br/>",
        "월/수/금: 상체 + 유산소 15분<br/>",
        "화/목/토: 하체 + 복근<br/>",
        "일: 휴식<br/>",
        "근비대 + 밸런스에 적합",
      ],
    }
  };

  const itemDescriptions = {
    "무릎 보호대": "무릎 관절을 보온하고 압박하여 안정성 향상, <br/>무거운 하중에서 무릎이 휘는 걸 방지합니다.",
    "바벨": "전신 근력 강화용 고중량 운동 기구입니다. 스쿼트, 데드리프트, 밀리터리 프레스 등 복합 운동에 사용됩니다.",
    "리프팅 벨트": "복압을 증가시켜 허리 안정화에 도움을 주는 도구입니다. 무거운 중량 운동 시 필수입니다.",
    "스쿼트 렉": "바벨을 안전하게 올리고 내릴 수 있도록 고정해주는 장비입니다. <br/>혼자 하는 운동에서 안전성을 높여줍니다.",
    "줄넘기": "심폐 지구력을 향상시키는 유산소 운동 기구입니다. 컷팅 및 체지방 감소 루틴에 활용됩니다.",
    "스텝박스": "점프 및 스텝 트레이닝용 박스입니다. 하체 유산소 트레이닝 및 체력 향상 루틴에 활용됩니다.",
    "체지방 측정기": "체성분을 분석하여 체지방률, 근육량 등을 측정할 수 있는 도구입니다.",
    "덤벨 세트": "다양한 근육 부위의 고립운동에 사용되는 가벼운 웨이트 기구입니다. <br/>초보자도 쉽게 사용 가능합니다.",
    "스트랩": "손의 그립 유지에 도움을 주는 보조 기구입니다. <br/>전완근 피로를 줄이고 당기는 운동에서 유리합니다.",
    "손목 보호대": "손목 관절을 보호하고 무거운 하중에서도 손목이 휘는 것을 방지합니다."
  };

  const supplementDescriptions = {
    "게이너": " 근육 성장 및 회복을 지원하는 제풉입니다. <br/>주로 운동 직후 30분 이내 섭취합니다.",
    "아르기닌": "면역력 강화, 근육 회복을 보조합니다. 장 건강, 피로 회복에 도움을 줍니다.<br/> 운동직후 or 취침전 섭취합니다.",
    "프로틴": "근성장 및 회복에 필수적인 단백질 공급을 돕는 제품입니다. <br/>주로 운동 직후 섭취합니다.",
    "BCAA": "운동 중 피로 감소와 근육 손실 방지에 도움을 주는 아미노산입니다.",
    "크리아틴": "근력 증가 및 고강도 운동 수행 능력을 향상시키는 대표적인 보충제입니다.",
    "오메가3": "혈액 순환과 염증 완화에 도움을 주며, 전반적인 건강 유지에 기여합니다.",
    "CLA": "면역력 강화, 근육 회복 보조에 도움을 주며 장건강, 피로회복에 도움을 줍니다.<br/>운동 직후 or 취침 전 섭취합니다.",
    "글루 타민": "면역력 강화, 근육 회복 보조 장 건강,피로 회복에 도움을 줍니다. <br/>운동 직후 or 취침 전 섭취합니다."

  };

  const goal = localStorage.getItem("goal");
  if (goal) {
    document.getElementById("goal-name").textContent = goal;

    const goalDesc = {
      "벌크업": "근육량과 체중 증가를 목표로 고중량/고탄수화물 기반의 루틴을 수행합니다.",
      "컷팅": "체지방 감량을 목표로 유산소와 저탄수화물 식단을 병행합니다.",
      "린매스업": "근육은 증가시키되 체지방은 최소한으로 유지하는 것을 목표로 합니다."
    };

    document.getElementById("goal-desc").textContent = goalDesc[goal] || "-";
  }

  const routineArr = JSON.parse(localStorage.getItem("routine") || "[]");
  const routine = routineArr[0];

  if (goal && routine && routineDetails[goal] && routineDetails[goal][routine]) {
    document.getElementById("routine-name").textContent = routine;
   document.getElementById("routine-desc").innerHTML = routineDetails[goal][routine]; // ✅ 이렇게 수정
  }

  function displayItems(key, containerId, descriptionMap) {
    const container = document.getElementById(containerId);
    const items = JSON.parse(localStorage.getItem(key) || "[]");
    if (!container || items.length === 0) return;

    container.innerHTML = items.map(item => {
      const desc = descriptionMap[item] || "설명이 등록되지 않았습니다.";
      return `<li class="list-group-item">
                <strong>${item}</strong><br/>
                <small class="text-muted">${desc}</small>
              </li>`;
    }).join("");
  }

  displayItems("step4Cart", "item-desc", itemDescriptions);
  displayItems("step5Cart", "supplement-desc", supplementDescriptions);
});


