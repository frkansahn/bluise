<template>
   <div class="admin-news" id="adminNews">
      <AdminHeader/>      
      <div class="admin-content-wrapper">
         <div class="row mt-4">
            <div class="col-12 mb-4">
                <h3>
                    Başvurular
                </h3>
                <table class="table table-sm" id="adminApplicationsTable">
                    <thead class="table-secondary">
                        <tr>
                            <th>Müşteri</th>
                            <th>İl</th>
                            <th>İlçe</th>
                            <th>Mahalle</th>
                            <th>Ada</th>
                            <th>Parsel</th>
                            <th>Tarih</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-light">
                        <tr v-for="(A,index) in applicationsList" :key="`bodyNews${index}`">
                            <td>{{A.name}}  {{A.surname}}</td>
                            <td>{{A.deed_province}} (İstanbul)</td>
                            <td>{{A.deed_district}}</td>
                            <td>{{A.neighborhood}}</td>
                            <td>{{A.island_number}}</td>
                            <td>{{A.parcel}}</td>
                            <td>{{A.createdAt | dateFormat}}</td>
                            <td>
                                <NuxtLink :to="`/admin/application-detail/${A.id}`" id="applicationsDetail" class="btn btn-sm btn-outline-primary px-4">
                                    Detay
                               </NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="paging" id="applicationsPagging"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default 
   {
      name:'AdminApplications',
      head() {
         return {
            title: "Admin Başvuru Sayfası"
         }
      },
      data() {
         return {
            pageLoading:false,
            applications:[],
            applicationsStart:0,
            applicationsEnd:15
         }
      },
      props:{

      },
      methods:{
        async getApplicationsByAdmin(){
            var _this = this;
            var token = _this.$cookiz.get("token");
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/application" , "token": token})
            .then(response => {
                if(response)
                {
                    _this.applications = response;
                    _this.pagination("#applicationsPagging" , response.length , "applicationsStart" , "applicationsEnd",15);
                }
                else
                {
                    _this.$router.push("/admin/login");
                }
               
            });
        },
        pagination(selector,count,start,end,itemPerPage){
            var _this = this;
            var pagingOptions = {
                totalCount: count,
                itemPerPage: itemPerPage,
                initialPage: 1,
                get totalPage() {
                    return Math.ceil(this.totalCount / this.itemPerPage)
                },
                location: selector
            }

            var paging = {
                append: ({ output, location }) => {
                    const holder = document.querySelector(location);

                    if (holder) {
                        holder.innerHTML = output;
                    }
                },
                bindEventHandlers: options => {
                    const nextButton = document.querySelector(selector + " .paging__btn--next"),
                        prevButton = document.querySelector(selector + " .paging__btn--back"),
                        pageButtons = document.querySelectorAll(
                            selector + " .paging__btn:not(.paging__btn--nav):not(.paging__btn--disabled)"
                        );

                    nextButton.addEventListener("click", () => {
                        paging.handleNextClick(options);
                    });
                    prevButton.addEventListener("click", () => {
                        paging.handlePrevClick(options);
                    });
                    Array.prototype.forEach.call(pageButtons, button => {
                        button.addEventListener("click", event => {
                            paging.handleItemClick(event, options);
                        });
                    });
                },
                createButton: ({ direction, isActive = true, text, isCurrent, index }) => {
                    const directionClass =
                        direction === "back"
                            ? "paging__btn--nav paging__btn--back"
                            : direction === "next"
                                ? "paging__btn--nav paging__btn--next"
                                : "",
                        buttonText =
                            direction === "back"
                                ? "&laquo;"
                                : direction === "next"
                                    ? "&raquo;"
                                    : text,
                        activeClass = !isActive ? "paging__btn--disabled" : "",
                        currentClass = isCurrent ? "paging__btn--current" : "",
                        modifiers = [activeClass, currentClass, directionClass],
                        buttonHtml = `<button data-page-index="${index}" class="paging__btn ${modifiers.join(
                            " "
                        )}"> ${buttonText} </button>`;

                    return buttonHtml;
                },
                createPaging: (options, callback) => {
                    const { location, initialPage, totalPage } = options,
                        backButton = paging.createButton({
                            direction: "back",
                            isActive: initialPage !== 1
                        }),
                        nextButton = paging.createButton({
                            direction: "next",
                            isActive: initialPage !== totalPage
                        });

                    let output = backButton;

                    if (initialPage > totalPage) {
                        return false;
                    }

                    if (totalPage > 6) {
                        let conditionInit, condition;

                        if (initialPage === totalPage) {
                            conditionInit = totalPage - 5;
                            condition = totalPage + 1;
                        } else if (initialPage === totalPage - 1) {
                            conditionInit = initialPage - 4;
                            condition = totalPage + 1;
                        } else if (initialPage === totalPage - 2) {
                            conditionInit = initialPage - 3;
                            condition = totalPage + 1;
                        } else if (initialPage === totalPage - 3) {
                            conditionInit = initialPage - 2;
                            condition = totalPage + 1;
                        } else if (initialPage === totalPage - 4) {
                            conditionInit = initialPage - 1;
                            condition = totalPage + 1;
                        } else {
                            conditionInit = initialPage;
                            condition = initialPage + 4;
                        }

                        for (let i = conditionInit; i < condition; i++) {
                            output += paging.createButton({
                                text: i,
                                isCurrent: i === initialPage,
                                index: i
                            });
                        }
                        let moreButton = "",
                            lastButton = "";

                        if (initialPage < totalPage - 4) {
                            moreButton = paging.createButton({
                                text: "...",
                                isActive: false,
                                index: ""
                            });
                        }

                        output += moreButton;

                        if (initialPage < totalPage - 3) {
                            lastButton = paging.createButton({
                                text: totalPage,
                                isCurrent: totalPage === initialPage,
                                index: totalPage
                            });
                        }

                        output += lastButton;
                    } else {
                        for (let i = 0; i < totalPage; i++) {
                            output += paging.createButton({
                                text: i + 1,
                                isCurrent: i + 1 === initialPage,
                                index: i + 1
                            });
                        }
                    }

                    output += nextButton;

                    paging.append({
                        output,
                        location
                    });

                    callback();
                },
                init: options => {
                    paging.createPaging(options, () => {
                        paging.bindEventHandlers(options);
                    });
                },
                handleItemClick: (event, options) => {
                    let { itemPerPage } = pagingOptions;
                    const clickedIndex = parseInt(event.target.dataset.pageIndex);

                    if (
                        typeof clickedIndex !== "undefined" &&
                        clickedIndex !== options.initialPage &&
                        clickedIndex <= options.totalPage
                    ) {
                        options.initialPage = clickedIndex;
                        paging.init(options);
                    }

                    _this.$data[start] = clickedIndex * itemPerPage - itemPerPage;
                    _this.$data[end] = clickedIndex * itemPerPage;
                    _this.$forceUpdate();
                },
                handleNextClick: pagingOptions => {
                    let { initialPage, totalPage, itemPerPage } = pagingOptions;

                    if (initialPage !== totalPage) {
                        initialPage += 1;
                    } else {
                        return false;
                    }

                    pagingOptions.initialPage = initialPage;

                    paging.init(pagingOptions);
                    _this.$data[start] = (initialPage * itemPerPage - itemPerPage);
                    _this.$data[end] = initialPage * itemPerPage;
                    _this.$forceUpdate();
                },
                handlePrevClick: pagingOptions => {
                    let { initialPage, itemPerPage } = pagingOptions;

                    if (initialPage !== 1) {
                        initialPage -= 1;
                    } else {
                        return false;
                    }

                    pagingOptions.initialPage = initialPage;

                    paging.init(pagingOptions);
                    _this.$data[start] = (initialPage * itemPerPage - itemPerPage);
                    _this.$data[end] = initialPage * itemPerPage;
                    _this.$forceUpdate();
                }
            }

            paging.init(pagingOptions);
        }
      },
      async created(){
         var _this = this;
         var token = _this.$cookiz.get("token");
         var userId = _this.$cookiz.get("_userId");
         if(token && userId)
         {
            this.getApplicationsByAdmin();     
         }             
      },
      computed:{
        applicationsList() {
            return this.applications.slice(this.applicationsStart,this.applicationsEnd);
        }
      }
   }
</script>

<style>
</style>
