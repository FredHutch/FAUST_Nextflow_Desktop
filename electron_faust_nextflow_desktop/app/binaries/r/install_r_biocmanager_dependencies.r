#!/usr/bin/env Rscript

# .libPaths()
# str(allPackage <- installed.packages(.Library, priority = "high"))
# allPackage [, c(1,3:5)]
# .libPaths()
# # .libPaths("/Users/lknecht/Repositories/FAUST_Nextflow_Desktop/electron_faust_nextflow_desktop/app/binaries/r/r-mac/library")
# library(BiocManager)

# # Heavily edited from here:
# # https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

# # Script to find dependencies of a pkg list, download binaries and put them
# # In the standalone R library.

# default_package_directories_to_remove <- c("help",
#                                            "doc",
#                                            "tests",
#                                            "html",
#                                            "include",
#                                            "unitTests",
#                                            file.path("libs", "*dSYM"))

installBiocmanagerDependencies <- function(packages,
                                           library_path,
                                           # type,
                                           decompress,
                                           remove_dirs = default_package_directories_to_remove) {
    # print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    # print("BiocManager!")
#     if (!length(packages)) {
#         print("No packages were specified to install")
#         return(NA)
#     }

#     previously_installed_libraries <- list.files(library_path)
#     requested_packages_to_install <- lapply(packages,
#                                             function(x) x[[1]])
#     requested_packages_to_install <- unlist(requested_packages_to_install)
#     detected_cran_packages_to_install <- setdiff(requested_packages_to_install,
#                                                  previously_installed_libraries)
#     selected_cran_packages_to_install <- packages[!(requested_packages_to_install %in% previously_installed_libraries)]

#     print(paste0("previously_installed_libraries: ", previously_installed_libraries))
#     print(paste0("requested_packages_to_install: ", requested_packages_to_install))
#     print(paste0("detected_cran_packages_to_install: ", detected_cran_packages_to_install))
#     print(paste0("selected_cran_packages_to_install: ", selected_cran_packages_to_install))
#     if (length(selected_cran_packages_to_install) == 0) {
#         print("All BiocManager packages have been already been installed")
#         return(NA)
#     }

#     temporary_download_directory_path <- tempdir()
#     # print(selected_cran_packages_to_install)
#     downloaded_packages <- lapply(selected_cran_packages_to_install,
#                                   function(element) {
#                                       package_name <- element[1]
#                                       package_version <- element[2]
#                                       # print(element)
#                                       # print(package_name)
#                                       # print(is.character(package_name))
#                                       # print(class(package_name))
#                                       # print(length(package_name))
#                                       # print(package_version)
#                                       # See this thread for install.packages` support
#                                       # https://support.bioconductor.org/p/112726/
#                                       if(is.na(package_version)) {
#                                           new_downloaded_package <- BiocManager::install(as.character(package_name), # No idea why I have to convert this to a string >:(
#                                                                                          destdir = temporary_download_directory_path,
#                                                                                          # repo = default_cran_repo_url,
#                                                                                          # type = type
#                                                                                          )
#                                       }
#                                       else {
#                                           new_downloaded_package <- BiocManager::install(as.character(package_name), # No idea why I have to convert this to a string >:(
#                                                                                          destdir = temporary_download_directory_path,
#                                                                                          # repo = default_cran_repo_url,
#                                                                                          # type = type,
#                                                                                          version = package_version)
#                                       }
#                                   })
#     # print(temporary_download_directory_path)
#     # # print(list.dirs(temporary_download_directory_path))
#     # print(list.files(temporary_download_directory_path, pattern = "\\.tgz$"))
#     # print("-------------------------------------------")
#     all_package_artifact_paths <- list()
#     if(type == "mac.binary.el-capitan") {
#         all_file_names <- list.files(temporary_download_directory_path,
#                                                 pattern = "\\.tgz$")
#         all_package_artifact_paths <- lapply(all_file_names,
#                                              function(element) {
#                                                 file_path <- file.path(temporary_download_directory_path, element)
#                                                 return(file_path)
#                                              })
#     }
#     else if(type == "win.binary") {
#         all_package_artifact_paths <- list.files(temporary_download_directory_path,
#                                                 pattern = "\\.zip$")
#     }
#     # print(all_package_artifact_paths)
#     lapply(all_package_artifact_paths,
#            function(compressed_package_file_path) {
#                 print("----------")
#                 print("compressed_package_file_path")
#                 class(compressed_package_file_path)
#                 print(file.exists(compressed_package_file_path))
#                 print(paste0("Extracting: ", compressed_package_file_path))
#                 print(compressed_package_file_path)
#                 print(compressed_package_file_path[1])
#                 decompress(compressed_package_file_path, exdir = library_path)
#                 unlink(compressed_package_file_path)
#             })

#     z <- lapply(
#         list.dirs(library_path, full.names = TRUE, recursive = FALSE),
#         function(x) {
#             unlink(file.path(x, remove_dirs), force = TRUE, recursive = TRUE)
#         }
#     )
#     # invisible(NULL)
}