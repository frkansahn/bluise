<template>
   <div class="admin-projects" id="adminProjects">
      <AdminHeader/>      
      <div class="admin-content-wrapper">
         <div class="row mt-4">
            <div class="col-12 mb-4">
               <h3>
                    Projeler
                    <NuxtLink :to="`/admin/add-projects`" id="addProjects" class="float-right text-secondary">
                        <small>+ Ekle</small>
                    </NuxtLink>
               </h3>
               <table class="table table-sm" id="adminProjectsTable">
                  <thead class="table-secondary">
                     <tr>
                        <th>Başlık</th>
                        <th>Kısa Açıklama</th>
                        <th>Tarih</th>
                        <th>Ekleyen</th>
                        <th>Seo Title</th>
                        <th>Seo Açıklama</th>
                        <th>Durum</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody class="table-light">
                     <tr v-for="(P,index) in projectsList" :key="`bodyProjects${index}`">
                        <td>{{P.subject}}</td>
                        <td>{{P.short_description}}</td>
                        <td>{{P.saved_date | dateFormat}}</td>
                        <td>{{P.saved_by}}</td>
                        <td>{{P.seo_title}}</td>
                        <td>{{P.seo_description}}</td>
                        <td>
                            <span class="switch" :class="[P.is_active == 1 ? 'active' : 'passive']" @click="changeProjectsStatus(P)">
                              
                            </span>
                        </td>
                        <td>
                           <NuxtLink :to="`/admin/projects-detail/${P.id}`" id="projectsEdit" class="btn btn-sm btn-outline-primary px-4">
                                    Düzenle
                              </NuxtLink>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <div class="paging" id="projectsPagging"></div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default 
   {
      name:'AdminProjects',
      head() {
         return {
            title: "Admin Proje Sayfası"
         }
      },
      data() {
         return {
            pageLoading:false,
            projects:[],
            projectsStart:0,
            projectsEnd:15,
         }
      },
      props:{

      },
      methods:{
         async changeProjectsStatus(projects)
         {
            var _this = this;
            var token = _this.$cookiz.get("token");
            _this.$store.dispatch('postService' , {"data":{id:projects.id , is_active:!projects.is_active} , "urlParameter":"/api/v1/projects/updateStatus" , "token":token})
                  .then(response => {
                  projects.is_active = !projects.is_active;                
                  });   
         },
         async getProjectsByAdmin(){
            var _this = this;
            var token = _this.$cookiz.get("token");
            _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/projects/all" , "token": token})
            .then(response => {
                  if(response)
                  {
                     _this.projects = response;
                     _this.pagination("#projectsPagging" , response.length);
                  }
                  else
                  {
                     _this.$router.push("/admin/login");
                  }
               
            });
        },
        pagination(selector,count){
            var _this = this;
            var pagingOptions = {
                totalCount: count,
                itemPerPage: 15,
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
                    const nextButton = document.querySelector(".paging__btn--next"),
                        prevButton = document.querySelector(".paging__btn--back"),
                        pageButtons = document.querySelectorAll(
                            ".paging__btn:not(.paging__btn--nav):not(.paging__btn--disabled)"
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

                    _this.projectsStart = clickedIndex * itemPerPage - itemPerPage;
                    _this.projectsEnd = clickedIndex * itemPerPage;
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
                    _this.projectsStart = (initialPage * itemPerPage - itemPerPage);
                    _this.projectsEnd = initialPage * itemPerPage;
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
                    _this.projectsStart = (initialPage * itemPerPage - itemPerPage);
                    _this.projectsEnd = initialPage * itemPerPage;
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
            this.getProjectsByAdmin();     
         }             
      },
      computed:{
         projectsList() {
            return this.projects.slice(this.projectsStart,this.projectsEnd);
         },
      }
   }
</script>

<style>
</style>
