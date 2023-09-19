<script setup lang="ts">
const { query } = useRoute();
const { push } = useRouter();

// ------------------ Props and Emits --------------------
const props = withDefaults(
  defineProps<{
    currentPage: string | number;
    pageRang?: number;
    perPage?: number;
    total: number;
  }>(),
  {
    currentPage: 1,
    pageRang: 2,
    perPage: 5,
  }
);
const { currentPage, pageRang, total, perPage } = toRefs(props);
const emit = defineEmits(["changePage"]);

// ------------------- Data --------------------
const getPageRang = ref<number>(pageRang.value);
const getCurrentPage = ref<number | string>((query.page as string) || (currentPage.value as string));

// ------------------- Computed --------------------
// Convert current to number
const convertCurrentToNumber = computed(() => +getCurrentPage.value);

// Total pages
const totalPages = computed((): number => {
  return Math.ceil(total.value / perPage.value);
});

// Ranges start and end
const rangeStart = computed((): number => {
  const start: number = convertCurrentToNumber.value - getPageRang.value;
  return start > 0 ? start : 1;
});
const rangeEnd = computed((): number => {
  const end: number = convertCurrentToNumber.value + getPageRang.value;
  return end < totalPages.value ? end : totalPages.value;
});

// Pages
const createPages = computed((): number[] => {
  const pages: number[] = [];
  for (let i: number = rangeStart.value; i <= rangeEnd.value; i++) {
    pages.push(i);
  }
  return pages;
});

// First page and last page
const hasFirstPage = computed((): boolean => {
  return rangeStart.value !== 1 && process.client && window.innerWidth > 600;
});
const hasLastPage = computed((): boolean => {
  return rangeEnd.value < totalPages.value && process.client && window.innerWidth > 600;
});

// Status for next and prev
const statusNext = computed((): boolean => {
  return convertCurrentToNumber.value < totalPages.value;
});
const statusPrev = computed((): boolean => {
  return convertCurrentToNumber.value > 1;
});

// ------------------- Watches --------------------
watch(currentPage, (value) => {
  getCurrentPage.value = value;
  push({ query: { page: value } });
});

// ------------------- Functions --------------------
const getNumPage = (page: number) => emit("changePage", page);
const nextBtn = (): void => getNumPage(convertCurrentToNumber.value + 1);
const prevBtn = (): void => getNumPage(convertCurrentToNumber.value - 1);

// ------------------- Lify cycles --------------------
onMounted(() => {
  getNumPage(getCurrentPage.value as number);
  if (window.innerWidth <= 600) getPageRang.value = 1;
});
</script>

<template>
  <div class="pagination">
    <!-- 1) - PAGINATION BTN PREV -->
    <div v-if="statusPrev" @click="prevBtn" class="pagination__btn pagination__btn--prev">
      <slot name="prev">prev</slot>
    </div>
    <!-- 2) - PAGINATION PAGINATOR -->
    <ul class="pagination__paginator">
      <!--  -->
      <li v-if="hasFirstPage" class="pagination__paginator__pagi" @click="getNumPage(1)">1</li>
      <li v-if="hasFirstPage" class="pagination__paginator__pagi pagination__paginator__pagi--spread">...</li>
      <!--  -->
      <ul class="pagination__paginator__sub">
        <li
          v-for="(page, index) in createPages"
          :key="index + 1"
          :class="['pagination__paginator__pagi', { 'pagination__paginator__pagi--active': getCurrentPage == page }]"
          @click="getNumPage(page)"
        >
          {{ page }}
        </li>
      </ul>
      <!--  -->
      <li v-if="hasLastPage" class="pagination__paginator__pagi pagination__paginator__pagi--spread">...</li>
      <li v-if="hasLastPage" class="pagination__paginator__pagi" @click="getNumPage(totalPages)">
        {{ totalPages }}
      </li>
    </ul>
    <!-- 3) - PAGINATION BTN NEXT -->
    <div v-if="statusNext" class="pagination__btn pagination__btn--next" @click="nextBtn">
      <slot name="next">next</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/////////////////////////////////
/// Maps
// 1
$background_pagination: (
  pagi: #454692,
  nextAndPrev: #f5f5f5,
);

// 2
$text-color_pagination: (
  nuActive: black,
  active: white,
);

/////////////////////////////////
/// Global classes
// 1
%global_pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  user-select: none;
  cursor: pointer;
}

// 2
%global_pagination_width {
  width: 48px;
  height: 44px;

  // Responsive
  @media (max-width: 900px) {
    width: 40px;
    height: 35px;
  }
}

/////////////////////////////////
// PAGINATION
.pagination {
  display: flex;
  justify-content: center;
  margin: 15px auto;
  max-width: 100%;
  //
  & ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  // PAGINATOR
  &__paginator {
    list-style: none;
    font-size: 1.6rem;

    // PAGI
    &__pagi {
      @extend %global_pagination;
      @extend %global_pagination_width;
      background-color: transparent;
      color: map-get($text-color_pagination, unActive);
      font-weight: 300;
      transition: all 0.2s ease;
      font-size: 19px;

      ///////////////////////////
      // Responsive
      @media (max-width: 900px) {
        font-size: 16px;
      }

      @media (max-width: 600px) {
        font-size: 14px;
      }

      // AND NEW PROPERTY ACTIVE
      &--active {
        background-color: map-get($background_pagination, pagi);
        font-weight: 400;
        color: map-get($text-color_pagination, active);
      }

      // ACTIVE AND HOVER
      &:hover {
        //
        @media (hover: hover) {
          background-color: darken(map-get($background_pagination, pagi), 10%);
          color: map-get($text-color_pagination, active);
        }
      }

      // SPREAD
      &--spread {
        @extend %global_pagination_width;
        color: map-get($text-color_pagination, unActive);
        cursor: default;

        // HOVER
        &:hover {
          //
          @media (hover: hover) {
            background-color: transparent;
            color: currentColor;
            box-shadow: none;
          }
        }
      }
    }

    // SUB
    &__sub {
      // NOT FIRST OF TYPE
      & li {
        margin-left: 10px;

        // Responsive
        @media (max-width: 900px) {
          margin-left: 5px;
        }
      }
    }
  }

  // BTN PREV
  &__btn--prev {
  }

  // BTN NEXT
  &__btn--next {
  }

  // BTN PREV AND BTN NEXT
  &__btn {
    @extend %global_pagination;
    padding: 0 10px;
    margin: 0 10px;
    background-color: map-get($background_pagination, nextAndPrev);
    text-transform: capitalize;
    transition: all 0.3s;

    // Responsive
    @media (max-width: 900px) {
      margin: 0 5px;
    }

    // HOVER
    &:hover {
      //
      @media (hover: hover) {
        background-color: darken(map-get($background_pagination, nextAndPrev), 10%);
        color: map-get($text-color_pagination, unActive);
      }
    }
  }
}

//
html[dir="rtl"] {
  //
  .pagination__btn {
    transform: scaleX(-1);
  }
}
</style>
