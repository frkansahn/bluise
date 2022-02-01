<template>
    <div class="admin-contents" id="adminContents">
        <AdminHeader/>      
        <div class="admin-content-wrapper">
            <div class="row mt-4">
                <div class="col-12 mb-4">
                    <div class="row justify-content-between">
                        <h3 class="col-md-3">
                            İçerikler
                            <NuxtLink :to="`/admin/add-contents`" id="addContents" class="float-right text-secondary ml-3">
                                <small>+ Ekle</small>
                            </NuxtLink>                      
                        </h3>
                        <b-form-group class="col-md-3" id="category_group" label="" label-for="category_input" description="">
                            <b-form-select v-model="selectedCategory" name="contentsCategory" @change="getContentsByAdmin">
                                <b-form-select-option value="all" selected>Tümü</b-form-select-option>
                                <b-form-select-option v-for="(CC , index) in contents_categories" :key="`contents_categories${index}`" :value="CC.id">{{CC.category_name}}</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </div>
                    
                    <table class="table table-sm" id="adminContentsTable">
                        <thead class="table-secondary">
                            <tr>
                                <th>Başlık</th>
                                <th>Kısa Açıklama</th>
                                <th>Kategori</th>
                                <th>Tarih</th>
                                <th>Ekleyen</th>
                                <th>Seo Title</th>
                                <th>Seo Link</th>
                                <th>Durum</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            <tr v-for="(C,index) in contentsList" :key="`bodyContents${index}`">
                                <td>{{C.subject}}</td>
                                <td>{{C.short_description}}</td>
                                <td>{{C.category_name}}</td>
                                <td>{{C.saved_date | dateFormat}}</td>
                                <td>{{C.saved_by}}</td>
                                <td>{{C.seo_title}}</td>
                                <td>{{C.seo_link}}</td>
                                <td>
                                    <span class="switch" :class="[C.is_active == 1 ? 'active' : 'passive']" @click="changeContentsStatus(C)"></span>
                                </td>
                                <td>
                                    <NuxtLink :to="`/admin/contents-detail/${C.id}`" id="contentsEdit" class="btn btn-sm btn-outline-primary px-4">
                                        Düzenle
                                    </NuxtLink>
                                </td>
                                <td>
                                    <a :href="`/contents/${C.seo_link}`" target="_blank" class="btn btn-sm btn-outline-secondary px-4">
                                        Git
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paging" id="contentsPagging"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default 
    {
        name:'AdminIcerik',
        head() {
            return {
                title: "Admin İçerik Sayfası"
            }
        },
        data() {
            return {
                pageLoading:false,
                contents:[],
                contents_categories:[],
                contentsStart:0,
                contentsEnd:15,
                selectedCategory:'all'
            }
        },
        props:{

        },
        methods:{
            async changeContentsStatus(contents)
            {
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$store.dispatch('postService' , {"data":{id:contents.id , is_active:!contents.is_active} , "urlParameter":"/api/v1/contents/updateStatus" , "token":token})
                .then(response => {
                    contents.is_active = !contents.is_active;                
                });   
            },
            async getContentsByAdmin(){
                var _this = this;
                var token = _this.$cookiz.get("token");
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents/all" , "token": token})
                .then(response => {
                    if(response)
                    {
                        if(_this.selectedCategory != 'all')
                        {
                            _this.contents = response.filter(item => {
                                return item.category_id == _this.selectedCategory
                            })
                        }
                        else
                        {
                            _this.contents = response;
                        }
                        _this.pagination("#contentsPagging" , response.length, "contentsStart" , "contentsEnd",15);
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
                _this.getContentsByAdmin();
                _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/contents_category" , "token": token})
                .then(response => {
                   _this.contents_categories = response;               
                });     
            }             
        },
        computed:{
            contentsList() {
                return this.contents.slice(this.contentsStart,this.contentsEnd);
            },
        }
    }
</script>

<style>
    
</style>
