package com.exadel.team3.backend.services.task.editor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FileEditor {

    private static final String FIND_PACKAGE = "^(package ).*(;)";
    private static final String FIND_SYSTEM = "(System\\.).*(\".*\")*(;)";
    private static final String FIND_RUNTIME = "(Runtime\\.).*(;)";
    private static final String NAME_OF_OUTPUT_FILE = "out.txt";



    public static List<File> editFiles(List<File> fileList) throws IOException {
        for (File file : fileList) {
            Path path = file.toPath();
            String fileContent = new String(Files.readAllBytes(path));

            fileContent = deleteFirst(fileContent, FIND_PACKAGE, "");
            fileContent = deleteAll(fileContent, FIND_SYSTEM, "");
            fileContent = deleteAll(fileContent, FIND_RUNTIME, "");

            String pathToFile = file.getParent().replaceAll("\\\\", "/") + "/" + NAME_OF_OUTPUT_FILE;
            fileContent = deleteAll(fileContent, NAME_OF_OUTPUT_FILE, pathToFile);

            Files.write(path, fileContent.getBytes());
        }

        return fileList;
    }

    private static String deleteFirst(String fileContent, String regex, String replacement) throws IOException {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(fileContent);
        return matcher.replaceFirst(replacement);
    }

    private static String deleteAll(String fileContent, String regex, String replacement) throws IOException {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(fileContent);
        return matcher.replaceAll(replacement);
    }
}
