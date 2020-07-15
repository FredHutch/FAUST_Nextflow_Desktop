# .libPaths()
# str(allPackage <- installed.packages(.Library, priority = "high"))
# allPackage [, c(1,3:5)]
# .libPaths()
print("---------------------------------------------------------------------")
print("Beginning BiocManager Dependency Installation!")
print("---------------------------------------------------------------------")
r_version_library_directory_path = Sys.getenv("R_VERSION_LIBRARY_DIRECTORY_RELATIVE_PATH")
message(r_version_library_directory_path)

# library_path <- file.path("/Users/lknecht/Repositories/FAUST_Nextflow_Desktop/electron_faust_nextflow_desktop/app/binaries/r",
#                           r_version_library_directory_path)
# .libPaths(library_path)

library("BiocManager")

# Heavily edited from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

# Script to find dependencies of a pkg list, download binaries and put them
# In the standalone R library.
installBiocmanagerDependencies <- function(packages,
                                           library_path,
                                           # type,
                                           decompress,
                                           remove_dirs = default_package_directories_to_remove) {
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    print("BiocManager!")
    if (!length(packages)) {
        print("No packages were specified to install")
        return(NA)
    }

    previously_installed_libraries <- list.files(library_path)
    requested_packages_to_install <- lapply(packages,
                                            function(x) x[[1]])
    requested_packages_to_install <- unlist(requested_packages_to_install)
    detected_packages_to_install <- setdiff(requested_packages_to_install,
                                                 previously_installed_libraries)
    selected_packages_to_install <- packages[!(requested_packages_to_install %in% previously_installed_libraries)]

    print(paste0("previously_installed_libraries: ", previously_installed_libraries))
    print(paste0("requested_packages_to_install: ", requested_packages_to_install))
    print(paste0("detected_packages_to_install: ", detected_packages_to_install))
    print(paste0("selected_packages_to_install: ", selected_packages_to_install))
    if (length(selected_packages_to_install) == 0) {
        print("All BiocManager packages have been already been installed")
        return(NA)
    }

    for (package_to_install in selected_packages_to_install) {
        # print("-------------------------")
        package_name <- package_to_install[[1]]
        package_version <- package_to_install[[2]]
        print(package_name)
        print(package_version)
        if(is.na(package_version)) {
            install.packages(package_name, repos = default_cran_repo_url)
            BiocManager::install(package_name,
                                    destdir = temporary_download_directory_path)
        }
        else {
            BiocManager::install(package_name,
                                version = package_version)
        }
    }
}